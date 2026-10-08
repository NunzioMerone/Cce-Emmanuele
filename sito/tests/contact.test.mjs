import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { validateContact, createContactService, createContactHandler, contactRateLimit, ContactError } from '../src/server/contact.mjs';

const recipient = 'cce.emmanuele@gmail.com';
const anonymous = { topic: 'prayer', message: 'Una richiesta di prova', callback: false, name: '', email: '', website: '' };
const enquiry = { ...anonymous, topic: 'message', name: 'Anna', email: 'anna@example.org' };
const env = { CONTACT_SMTP_HOST: 'smtp.example.org', CONTACT_SMTP_USER: 'sender@example.org', CONTACT_SMTP_PASSWORD: 'test-only-password' };

async function request(service, { method = 'POST', body = enquiry, origin = 'http://localhost:4173', type = 'application/json', limiter } = {}) {
  const req = Readable.from([Buffer.from(typeof body === 'string' ? body : JSON.stringify(body))]);
  req.method = method;
  req.headers = { host: 'localhost:4173', origin, 'content-type': type };
  req.socket = { remoteAddress: '127.0.0.1' };
  const result = {};
  const res = { writeHead(status, headers) { result.status = status; result.headers = headers; return this; }, end(data) { result.body = JSON.parse(data); } };
  await createContactHandler(service, limiter)(req, res);
  return result;
}

test('one form accepts anonymous prayer and requires valid reply details for enquiries', () => {
  assert.equal(validateContact(anonymous).callback, false);
  assert.equal(validateContact(enquiry).callback, true);
  assert.throws(() => validateContact({ ...enquiry, email: '' }), ContactError);
  assert.throws(() => validateContact({ ...enquiry, name: 'Anna\r\nBcc: other@example.org' }), ContactError);
  assert.throws(() => validateContact({ ...anonymous, message: 'x'.repeat(3001) }), ContactError);
  assert.throws(() => validateContact({ ...anonymous, website: 'spam.example' }), ContactError);
  const data = validateContact({ ...anonymous, name: 'Ignored', email: 'ignored@example.org' });
  assert.equal(data.name, '');
  assert.equal(data.email, '');
});

test('SMTP always sends to the configured church and uses the visitor only as reply-to', async () => {
  let options, mail;
  const service = createContactService(env, recipient, config => { options = config; return { async sendMail(data) { mail = data; return { accepted: [recipient] }; } }; });
  await service.send({ ...enquiry, to: 'other@example.org' });
  assert.equal(mail.to, recipient);
  assert.equal(mail.from.address, env.CONTACT_SMTP_USER);
  assert.deepEqual(mail.replyTo, { name: 'Anna', address: 'anna@example.org' });
  assert.equal(options.secure, true);
  await service.send(anonymous);
  assert.equal(mail.replyTo, undefined);
  assert.equal(mail.text, anonymous.message);
});

test('unconfigured, rejected and failing SMTP never report success or expose credentials', async () => {
  assert.equal(createContactService({}, recipient).configured, false);
  await assert.rejects(createContactService({}, recipient).send(anonymous), { code: 'unavailable', status: 503 });
  for (const sendMail of [async () => ({ accepted: [] }), async () => { throw new Error(env.CONTACT_SMTP_PASSWORD); }]) {
    await assert.rejects(createContactService(env, recipient, () => ({ sendMail })).send(enquiry), error => error.code === 'unavailable' && !error.message.includes(env.CONTACT_SMTP_PASSWORD));
  }
});

test('HTTP endpoint rejects cross-site requests, invalid JSON, excessive payload and unsupported content type', async () => {
  let sent = 0;
  const service = { configured: true, async send(data) { validateContact(data); sent++; } };
  assert.equal((await request(service, { origin: 'https://elsewhere.example' })).status, 403);
  assert.equal((await request(service, { body: 'invalid json' })).status, 400);
  assert.equal((await request(service, { body: 'x'.repeat(17000) })).status, 413);
  assert.equal((await request(service, { type: 'text/plain' })).status, 415);
  assert.equal(sent, 0);
  const success = await request(service);
  assert.deepEqual(success.body, { status: 'sent' });
  assert.equal(sent, 1);
});

test('availability exposes only a boolean and the endpoint returns bounded rate-limit errors', async () => {
  const service = { configured: false };
  assert.deepEqual((await request(service, { method: 'GET' })).body, { available: false });
  assert.equal((await request(service)).status, 503);
  const blocked = await request({ configured: true }, { limiter: () => false });
  assert.equal(blocked.status, 429);
  assert.equal(blocked.headers['Retry-After'], '900');
});

test('rate limiting expires old entries and bounds the number of stored clients', () => {
  let time = 0;
  const allow = contactRateLimit({ now: () => time, limit: 2, windowMs: 100, maxClients: 1 });
  assert.equal(allow('a'), true);
  assert.equal(allow('a'), true);
  assert.equal(allow('a'), false);
  assert.equal(allow('b'), false);
  time = 100;
  assert.equal(allow('b'), true);
});

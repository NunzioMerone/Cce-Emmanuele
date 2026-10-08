import nodemailer from 'nodemailer';

export class ContactError extends Error {
  constructor(code, status = 400) { super(code); this.code = code; this.status = status; }
}

/** @param {unknown} input */
export function validateContact(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ContactError('invalid');
  const { topic, message, callback, website } = input;
  if (!['prayer', 'message'].includes(topic) || typeof message !== 'string' || !message.trim() || message.length > 3000 || typeof callback !== 'boolean' || website) throw new ContactError('invalid');
  const needsReply = topic === 'message' || callback;
  const name = needsReply ? input.name : '';
  const email = needsReply ? input.email : '';
  if (needsReply && (typeof name !== 'string' || !name.trim() || name.length > 100 || /[\r\n\x00-\x1f]/.test(name) || typeof email !== 'string' || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email))) throw new ContactError('invalid');
  return { topic, message: message.trim(), callback: needsReply, name: name.trim(), email: email.trim() };
}

/** SMTP configuration is read only on the server; the recipient is never supplied by the browser. */
export function createContactService(env, recipient, createTransport = nodemailer.createTransport) {
  const host = env.CONTACT_SMTP_HOST || '';
  const user = env.CONTACT_SMTP_USER || '';
  const pass = env.CONTACT_SMTP_PASSWORD || '';
  const from = env.CONTACT_FROM_EMAIL || user;
  const port = Number(env.CONTACT_SMTP_PORT || 465);
  const secure = port === 465;
  const validEmail = value => /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value);
  const configured = !!(host && user && pass && validEmail(from) && validEmail(recipient) && Number.isInteger(port) && port > 0 && port <= 65535);
  const transport = configured ? createTransport({ host, port, secure, requireTLS: !secure, auth: { user, pass }, connectionTimeout: 10000, greetingTimeout: 10000, socketTimeout: 20000, disableFileAccess: true, disableUrlAccess: true }) : null;
  return {
    configured,
    async send(input) {
      const data = validateContact(input);
      if (!transport) throw new ContactError('unavailable', 503);
      const subject = data.topic === 'prayer' ? 'Richiesta di preghiera · Sito Emmanuele' : 'Un messaggio · Sito Emmanuele';
      const text = [data.message, ...(data.callback ? ['', `Nome: ${data.name}`, `Email: ${data.email}`, 'Desidero ricevere una risposta.'] : [])].join('\n');
      try {
        const result = await transport.sendMail({ from: { name: 'Chiesa Emmanuele — sito', address: from }, to: recipient, ...(data.callback ? { replyTo: { name: data.name, address: data.email } } : {}), subject, text });
        if (!result.accepted?.some(address => String(address).toLowerCase() === recipient.toLowerCase())) throw new Error('Recipient rejected');
      } catch { throw new ContactError('unavailable', 503); }
    },
  };
}

/** @param {import('node:http').IncomingMessage} request */
function readJson(request) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    request.on('data', chunk => { size += chunk.length; if (size <= 16384) chunks.push(chunk); });
    request.on('end', () => {
      if (size > 16384) return reject(new ContactError('too_large', 413));
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(new ContactError('invalid')); }
    });
    request.on('error', () => reject(new ContactError('invalid')));
    request.on('aborted', () => reject(new ContactError('invalid')));
  });
}

/** Bounded in-memory rate limit, with no retention of message bodies or email addresses. */
export function contactRateLimit({ now = Date.now, limit = 5, windowMs = 900000, maxClients = 5000 } = {}) {
  const clients = new Map();
  return key => {
    const time = now();
    for (const [client, value] of clients) if (value.until <= time) clients.delete(client);
    let entry = clients.get(key);
    if (!entry) {
      if (clients.size >= maxClients) return false;
      entry = { count: 0, until: time + windowMs };
      clients.set(key, entry);
    }
    entry.count++;
    return entry.count <= limit;
  };
}

export function createContactHandler(service, allowRequest = contactRateLimit()) {
  return async (request, response) => {
    const respond = (status, data, extra = {}) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...extra }).end(JSON.stringify(data));
    };
    if (request.method === 'GET') return respond(200, { available: service.configured });
    if (request.method !== 'POST') return respond(405, { status: 'invalid' }, { Allow: 'GET, POST' });
    try {
      const origin = new URL(request.headers.origin || '');
      if (!['https:', 'http:'].includes(origin.protocol) || origin.host !== request.headers.host || request.headers['sec-fetch-site'] === 'cross-site') throw new ContactError('invalid_origin', 403);
      if (!request.headers['content-type']?.startsWith('application/json')) throw new ContactError('invalid', 415);
      if (!allowRequest(request.socket.remoteAddress || 'unknown')) throw new ContactError('rate_limited', 429);
      if (!service.configured) throw new ContactError('unavailable', 503);
      const data = await readJson(request);
      await service.send(data);
      respond(200, { status: 'sent' });
    } catch (error) {
      const status = error instanceof ContactError ? error.status : 400;
      const code = error instanceof ContactError ? error.code : 'invalid';
      respond(status, { status: code }, status === 429 ? { 'Retry-After': '900' } : {});
    }
  };
}

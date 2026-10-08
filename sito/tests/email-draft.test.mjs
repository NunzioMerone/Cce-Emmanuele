import test from 'node:test';
import assert from 'node:assert/strict';
import { emailDraft } from '../src/utils/email-draft.mjs';

const values = { prayer: false, name: 'Anna & Marco', email: 'anna@example.org', phone: '', message: 'Una domanda?\nFede & comunità #insieme', callback: false };

test('email draft preserves multiline text and special characters inside the body', () => {
  const url = new URL(emailDraft('cce.emmanuele@gmail.com', values));
  assert.equal(url.protocol, 'mailto:');
  assert.equal(url.pathname, 'cce.emmanuele@gmail.com');
  assert.equal(url.searchParams.get('subject'), 'Un messaggio dal sito della Chiesa Emmanuele');
  assert.equal(url.searchParams.get('body'), 'Una domanda?\nFede & comunità #insieme\n\nNome: Anna & Marco\nEmail: anna@example.org');
  assert.equal(url.hash, '');
  assert.equal([...url.searchParams].length, 2);
});

test('prayer draft supports an anonymous request and an explicit callback', () => {
  const anonymous = new URL(emailDraft('cce.emmanuele@gmail.com', { ...values, prayer: true, name: '', email: '', message: 'Una richiesta', callback: false }));
  assert.equal(anonymous.searchParams.get('subject'), 'Richiesta di preghiera');
  assert.equal(anonymous.searchParams.get('body'), 'Una richiesta');
  const callback = new URL(emailDraft('cce.emmanuele@gmail.com', { ...values, prayer: true, callback: true }));
  assert.match(callback.searchParams.get('body'), /Desidero essere ricontattato\.$/);
  assert.throws(() => emailDraft('chiesa@example.org?bcc=other@example.org', values));
});

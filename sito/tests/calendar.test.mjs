import test from 'node:test';
import assert from 'node:assert/strict';
import { currentYear } from '../src/utils/calendar.mjs';

test('L’anno del footer segue la data corrente senza dipendere dall’anno della build', () => {
  assert.equal(currentYear(new Date('2026-10-06T10:00:00Z')), '2026');
  assert.equal(currentYear(new Date('2030-06-01T10:00:00Z')), '2030');
});

test('Il cambio di anno del footer rispetta il fuso Europe/Rome', () => {
  assert.equal(currentYear(new Date('2026-12-31T22:59:59Z')), '2026');
  assert.equal(currentYear(new Date('2026-12-31T23:00:00Z')), '2027');
});

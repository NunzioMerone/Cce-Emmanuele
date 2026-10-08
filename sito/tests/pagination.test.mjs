import test from 'node:test';
import assert from 'node:assert/strict';
import { visibleItems } from '../src/utils/pagination.mjs';

test('La griglia cresce da 20 a 100 senza perdere o duplicare messaggi già visibili', () => {
  const source = Array.from({ length: 100 }, (_, index) => index);
  let previous = [];
  for (let count = 20; count <= 100; count += 20) {
    const result = visibleItems(source, count, 20);
    assert.equal(result.count, count);
    assert.deepEqual(result.items.slice(0, previous.length), previous);
    assert.equal(new Set(result.items).size, count);
    assert.equal(result.remaining, 100 - count);
    assert.equal(result.nextCount, Math.min(100, count + 20));
    previous = result.items;
  }
  assert.deepEqual(previous, source);
  assert.equal(visibleItems(source.slice(0, 95), 80, 20).nextCount, 95);
});

test('Liste brevi, risultati vuoti e limiti non validi conservano una finestra valida', () => {
  assert.deepEqual(visibleItems([1, 2], 20, 20).items, [1, 2]);
  assert.equal(visibleItems([], 100, 20).count, 0);
  assert.equal(visibleItems(Array(30).fill(1), -2, 20).count, 20);
  assert.equal(visibleItems(Array(30).fill(1), NaN, 20).count, 20);
  assert.throws(() => visibleItems([1], 20, 0));
});

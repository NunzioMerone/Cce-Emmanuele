/** An expanding prefix of a collection. The complete list is retained for filtering.
 * @template T
 * @param {T[]} items @param {number} requested @param {number} batchSize */
export function visibleItems(items, requested, batchSize) {
  if (!Number.isSafeInteger(batchSize) || batchSize < 1) throw new Error('Dimensione del gruppo non valida.');
  const limit = Number.isSafeInteger(requested) && requested >= batchSize ? requested : batchSize;
  const count = Math.min(items.length, limit);
  return { items: items.slice(0, count), count, total: items.length, remaining: items.length - count, nextCount: Math.min(items.length, count + batchSize) };
}

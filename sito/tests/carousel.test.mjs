import test from 'node:test';
import assert from 'node:assert/strict';
import { carouselLayout, nearestCarouselPosition } from '../src/utils/carousel.mjs';

const layout = (width, count = 3) => carouselLayout({ width, count, minItemWidth: 260, maxVisible: 3, gap: 22 });

test('Il carosello passa da tre card a due appena manca spazio, senza una seconda riga', () => {
  assert.equal(layout(824).visible, 3);
  assert.equal(layout(823.5).visible, 2);
  assert.equal(layout(542).visible, 2);
  assert.equal(layout(541.5).visible, 1);
  assert.equal(layout(350).positions.length, 3);
  assert.equal(layout(704).positions.length, 2);
  assert.equal(layout(1104).positions.length, 1);
});

test('L’ultima vista coincide con il limite di scorrimento anche con misure frazionarie e liste diverse', () => {
  for (const width of [280, 350, 541.5, 704, 823.5, 1104]) {
    for (const count of [1, 2, 3, 7]) {
      const { visible, positions } = layout(width, count);
      const cardWidth = (width - (visible - 1) * 22) / visible;
      const contentWidth = count * cardWidth + (count - 1) * 22;
      assert(Math.abs(positions.at(-1) - Math.max(0, contentWidth - width)) < .001);
      assert.equal(positions.length, Math.max(1, count - visible + 1));
      assert(positions.every((position, index) => !index || position > positions[index - 1]));
    }
  }
});

test('Trascinamento e ridimensionamento selezionano una vista valida senza superare gli estremi', () => {
  const mobile = layout(350).positions;
  assert.equal(nearestCarouselPosition(240, mobile), 1);
  assert.equal(nearestCarouselPosition(-100, mobile), 0);
  assert.equal(nearestCarouselPosition(10000, mobile), 2);
  assert.equal(nearestCarouselPosition(10000, layout(1104).positions), 0);
  assert.deepEqual(layout(0), { visible: 0, positions: [] });
  assert.deepEqual(layout(704, 0), { visible: 0, positions: [] });
});

test('Le card di serie brevi mantengono la dimensione delle serie complete', () => {
  for (const width of [350, 704, 1104]) {
    const options = { width, minItemWidth: 240, maxVisible: 4, gap: 18 };
    const capacity = carouselLayout({ ...options, count: 12 }).visible;
    for (const count of [1, 2, 3, 4]) {
      assert.equal(carouselLayout({ ...options, count }).visible, capacity);
    }
  }
});

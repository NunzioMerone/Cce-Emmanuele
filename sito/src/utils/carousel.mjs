/**
 * Card width depends on viewport capacity, never on the number of items.
 * Every overflowing view advances one item; short lists retain empty slots.
 * @param {{width:number, count:number, minItemWidth:number, maxVisible:number, gap:number}} options
 * @returns {{visible:number, positions:number[]}}
 */
export function carouselLayout({ width, count, minItemWidth, maxVisible, gap }) {
  if (width <= 0 || count <= 0) return { visible: 0, positions: [] };
  const visible = Math.min(maxVisible, Math.max(1, Math.floor((width + gap) / (minItemWidth + gap))));
  const itemWidth = (width - gap * (visible - 1)) / visible;
  const positions = Array.from({ length: Math.max(1, count - visible + 1) }, (_, index) => index * (itemWidth + gap));
  return { visible, positions };
}

/** @param {number} offset @param {number[]} positions @returns {number} */
export function nearestCarouselPosition(offset, positions) {
  let nearest = 0;
  positions.forEach((position, index) => {
    if (Math.abs(position - offset) < Math.abs(positions[nearest] - offset)) nearest = index;
  });
  return nearest;
}

/** One of three indicators: start, intermediate views, end.
 * @param {number} index @param {number} count @returns {0|1|2} */
export function carouselIndicatorIndex(index, count) {
  if (count <= 1 || index <= 0) return 0;
  return index >= count - 1 ? 2 : 1;
}

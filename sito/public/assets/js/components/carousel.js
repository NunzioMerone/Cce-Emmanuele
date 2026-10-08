import { carouselLayout, nearestCarouselPosition } from '../utils/carousel.mjs';

/** @typedef {{refresh:()=>void, destroy:()=>void}} CarouselController */
/** @type {WeakMap<HTMLElement, CarouselController>} */
const controllers = new WeakMap();

/** @param {ParentNode} [scope] */
export function initializeCarousels(scope = document) {
  if (scope instanceof HTMLElement && scope.matches('[data-carousel]')) initializeCarousel(scope);
  scope.querySelectorAll('[data-carousel]').forEach(root => {
    if (root instanceof HTMLElement) initializeCarousel(root);
  });
}

/** @param {HTMLElement} root @returns {CarouselController|null} */
export function initializeCarousel(root) {
  if (controllers.has(root)) return controllers.get(root) || null;
  const track = root.querySelector('[data-carousel-track]');
  const controls = root.querySelector('[data-carousel-controls]');
  const previous = root.querySelector('[data-carousel-previous]');
  const next = root.querySelector('[data-carousel-next]');
  const dotGroup = root.querySelector('[data-carousel-dots]');
  const status = root.querySelector('[data-carousel-status]');
  if (!(track instanceof HTMLElement) || !(controls instanceof HTMLElement)
    || !(previous instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement)
    || !(dotGroup instanceof HTMLElement) || !(status instanceof HTMLElement)) return null;

  const minItemWidth = Math.max(1, Number(root.dataset.carouselMinWidth) || 260);
  const maxVisible = Math.max(1, Math.floor(Number(root.dataset.carouselMaxVisible) || 3));
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const events = new AbortController();
  /** @type {number[]} */
  let positions = [];
  /** @type {HTMLElement[]} */
  let dots = [];
  let active = 0;
  /** @type {number|null} */
  let destination = null;
  let enabled = false;
  let scrollFrame = 0;
  let layoutFrame = 0;
  let suppressClickUntil = 0;
  /** @type {{id:number, x:number, y:number, scroll:number, active:boolean}|null} */
  let drag = null;

  /** @param {number} index */
  function updateActive(index) {
    active = Math.max(0, Math.min(index, positions.length - 1));
    dots.forEach((dot, dotIndex) => {
      const current = dotIndex === 0 ? active === 0 : dotIndex === 2 ? active === positions.length - 1 : active > 0 && active < positions.length - 1;
      if (current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    const progress = dots[1];
    if (progress) {
      progress.style.setProperty('--carousel-progress', String(positions.length > 1 ? active / (positions.length - 1) : 0));
      progress.setAttribute('aria-valuemax', String(Math.max(1, positions.length)));
      progress.setAttribute('aria-valuenow', String(active + 1));
      progress.setAttribute('aria-valuetext', `Vista ${active + 1} di ${Math.max(1, positions.length)}`);
    }
    previous.disabled = active === 0;
    next.disabled = active >= positions.length - 1;
    const message = enabled ? `Vista ${active + 1} di ${positions.length}` : '';
    if (status.textContent !== message) status.textContent = message;
  }

  /** @param {number} index */
  function goTo(index) {
    if (!enabled) return;
    const target = Math.max(0, Math.min(index, positions.length - 1));
    destination = target;
    updateActive(target);
    track.scrollTo({ left: positions[target], behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  }

  function rebuildDots() {
    if (dots.length === 3) return;
    dots = [0, 1, 2].map(index => {
      if (index === 1) {
        const progress = document.createElement('span');
        progress.className = 'carousel-dot carousel-dot--progress';
        progress.setAttribute('role', 'progressbar');
        progress.setAttribute('aria-label', 'Avanzamento nella raccolta');
        progress.setAttribute('aria-valuemin', '1');
        const track = document.createElement('span');
        track.className = 'carousel-progress-track';
        const fill = document.createElement('span');
        fill.className = 'carousel-progress-fill';
        track.append(fill);
        progress.append(track);
        return progress;
      }
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.dataset.carouselEdge = index === 0 ? 'first' : 'last';
      dot.setAttribute('aria-label', index === 0 ? 'Inizio della raccolta' : 'Fine della raccolta');
      dot.setAttribute('aria-controls', track.id);
      return dot;
    });
    dotGroup.replaceChildren(...dots);
  }

  function refresh() {
    const width = track.clientWidth;
    if (!width) { controls.hidden = true; return; }
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const layout = carouselLayout({ width, count: track.children.length, minItemWidth, maxVisible, gap });
    const layoutChanged = positions.length !== layout.positions.length
      || positions.some((position, index) => Math.abs(position - layout.positions[index]) > .5);
    positions = layout.positions;
    enabled = positions.length > 1;
    root.style.setProperty('--carousel-visible', String(layout.visible || 1));
    root.classList.toggle('is-scrollable', enabled);
    if (enabled) {
      root.setAttribute('aria-roledescription', 'carosello');
      track.tabIndex = 0;
    } else {
      root.removeAttribute('aria-roledescription');
      track.removeAttribute('tabindex');
    }
    controls.hidden = !enabled || track.getAttribute('aria-busy') === 'true';
    rebuildDots();
    updateActive(active);
    if (layoutChanged) {
      destination = null;
      track.scrollTo({ left: positions[active] || 0, behavior: 'instant' });
    }
  }

  function scheduleLayout() {
    if (!layoutFrame) layoutFrame = requestAnimationFrame(() => { layoutFrame = 0; refresh(); });
  }

  function finishDrag() {
    if (!drag) return;
    const finished = drag;
    drag = null;
    track.classList.remove('is-dragging');
    if (track.hasPointerCapture(finished.id)) track.releasePointerCapture(finished.id);
    if (finished.active) {
      suppressClickUntil = performance.now() + 350;
      goTo(nearestCarouselPosition(track.scrollLeft, positions));
    }
  }

  previous.addEventListener('click', () => goTo(active - 1), { signal: events.signal });
  next.addEventListener('click', () => goTo(active + 1), { signal: events.signal });
  dotGroup.addEventListener('click', event => {
    if (!(event.target instanceof Element)) return;
    const dot = event.target.closest('[data-carousel-edge]');
    if (dot instanceof HTMLButtonElement) goTo(dot.dataset.carouselEdge === 'first' ? 0 : positions.length - 1);
  }, { signal: events.signal });

  track.addEventListener('scroll', () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {
      scrollFrame = 0;
      if (destination !== null && Math.abs(track.scrollLeft - positions[destination]) < 1) destination = null;
      updateActive(destination ?? nearestCarouselPosition(track.scrollLeft, positions));
    });
  }, { passive: true, signal: events.signal });
  track.addEventListener('keydown', event => {
    if (!enabled || event.target !== track) return;
    const targets = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: positions.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    goTo(targets[/** @type {keyof typeof targets} */ (event.key)]);
  }, { signal: events.signal });

  // Touch uses native scrolling and momentum. Mouse dragging works on buttons,
  // too, while keeping a normal click available when no horizontal drag occurs.
  track.addEventListener('pointerdown', event => {
    destination = null;
    if (!enabled || event.pointerType !== 'mouse' || event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest('input, textarea, select, [data-carousel-no-drag]')) return;
    track.scrollTo({ left: track.scrollLeft, behavior: 'instant' });
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, scroll: track.scrollLeft, active: false };
  }, { signal: events.signal });
  track.addEventListener('wheel', () => { destination = null; }, { passive: true, signal: events.signal });
  window.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    const distance = event.clientX - drag.x;
    if (!drag.active) {
      if (Math.abs(distance) < 8 || Math.abs(distance) <= Math.abs(event.clientY - drag.y)) return;
      drag.active = true;
      track.classList.add('is-dragging');
      track.setPointerCapture(drag.id);
    }
    event.preventDefault();
    track.scrollLeft = drag.scroll - distance;
  }, { passive: false, signal: events.signal });
  window.addEventListener('pointerup', finishDrag, { signal: events.signal });
  window.addEventListener('pointercancel', finishDrag, { signal: events.signal });
  track.addEventListener('lostpointercapture', finishDrag, { signal: events.signal });
  track.addEventListener('dragstart', event => { if (enabled) event.preventDefault(); }, { signal: events.signal });
  track.addEventListener('click', event => {
    if (performance.now() >= suppressClickUntil) return;
    suppressClickUntil = 0;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { capture: true, signal: events.signal });

  const contentObserver = new MutationObserver(scheduleLayout);
  contentObserver.observe(track, { childList: true, attributes: true, attributeFilter: ['hidden', 'aria-busy'] });
  const sizeObserver = new ResizeObserver(scheduleLayout);
  sizeObserver.observe(track);
  const controller = {
    refresh,
    destroy() {
      finishDrag();
      events.abort();
      contentObserver.disconnect();
      sizeObserver.disconnect();
      cancelAnimationFrame(scrollFrame);
      cancelAnimationFrame(layoutFrame);
      root.style.removeProperty('--carousel-visible');
      root.classList.remove('is-scrollable');
      root.removeAttribute('aria-roledescription');
      track.removeAttribute('tabindex');
      controls.hidden = true;
      dotGroup.replaceChildren();
      status.textContent = '';
      controllers.delete(root);
    },
  };
  controllers.set(root, controller);
  refresh();
  return controller;
}

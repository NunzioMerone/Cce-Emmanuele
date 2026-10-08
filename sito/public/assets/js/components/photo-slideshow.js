export function initializePhotoSlideshows() {
  document.querySelectorAll('[data-photo-slideshow]').forEach(initializeSlideshow);
}

/** @param {Element} element */
function initializeSlideshow(element) {
  if (!(element instanceof HTMLElement)) return;
  const slides = [...element.querySelectorAll('.photo-slideshow-image')].filter(slide => slide instanceof HTMLImageElement);
  if (slides.length < 2) return;
  const requestedInterval = Number(element.dataset.slideInterval);
  const interval = Number.isFinite(requestedInterval) && requestedInterval >= 1000 ? requestedInterval : 7000;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = motion.matches;
  let inView = true;
  let current = 0;
  /** @type {number|undefined} */
  let timer;

  function show(index) {
    current = index;
    slides.forEach((slide, position) => {
      const active = position === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
  }

  function schedule() {
    clearTimeout(timer);
    if (paused || !inView || document.hidden) return;
    timer = window.setTimeout(() => {
      // Keep a loaded image visible if another photo has failed to load.
      for (let offset = 1; offset < slides.length; offset++) {
        const next = (current + offset) % slides.length;
        if (slides[next].complete && slides[next].naturalWidth) { show(next); break; }
      }
      schedule();
    }, interval);
  }

  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; schedule(); });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; schedule(); });
    observer.observe(element);
  }
  schedule();
}

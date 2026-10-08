const targets = [
  '[data-reveal]',
  '.home-about-intro-copy > *', '.sermon-preview-heading > *', '.sermon-card',
  '.page-hero > *', '.section-heading > *', '.about-story > *', '.value-card',
  '.first-visit > *', '.mission-band .container', '.sermons-intro > *',
  '.latest-message', '.archive-top > *', '.contact-intro', '.contact-card',
  '.footer-grid > *',
].join(',');

export function initializeMotion() {
  if (!('IntersectionObserver' in window)) return;
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  /** @type {WeakSet<HTMLElement>} */
  const prepared = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
  }, { threshold: .08, rootMargin: '0px 0px -32px 0px' });

  /** @param {Element} element */
  function reveal(element) {
    element.classList.remove('reveal-pending');
    observer.unobserve(element);
    if (!(element instanceof HTMLElement)) return;
    if (motion.matches) {
      element.classList.remove('reveal-prepared', 'reveal-visible');
      element.style.removeProperty('--reveal-delay');
      return;
    }
    element.classList.add('reveal-visible');
    // Restore component hover transitions after the entrance has finished.
    /** @param {TransitionEvent} event */
    function finished(event) {
      if (event.target !== element || event.propertyName !== 'opacity') return;
      element.classList.remove('reveal-prepared', 'reveal-visible');
      element.style.removeProperty('--reveal-delay');
      element.removeEventListener('transitionend', finished);
    }
    element.addEventListener('transitionend', finished);
  }

  /** @param {Element} element */
  function prepare(element) {
    if (!(element instanceof HTMLElement) || prepared.has(element)) return;
    // Navigation must remain immediately visible across page changes.
    if (element.closest('.site-header')) return;
    prepared.add(element);
    if (motion.matches) return;
    // Do not stack entrance transforms on nested animation targets.
    if (element.parentElement?.closest('.reveal-prepared')) return;
    const siblings = [...(element.parentElement?.children || [])].filter(child => child.matches(targets));
    const requested = Number(element.dataset.revealDelay ?? Math.min(siblings.indexOf(element), 4) * 90);
    const delay = Number.isFinite(requested) ? Math.max(0, Math.min(requested, 600)) : 0;
    element.style.setProperty('--reveal-delay', `${delay}ms`);
    element.classList.add('reveal-prepared', 'reveal-pending');
    observer.observe(element);
  }

  /** @param {Element} root */
  function scan(root) {
    if (root.matches(targets)) prepare(root);
    root.querySelectorAll(targets).forEach(prepare);
  }

  scan(document.body);
  // Cards arriving from YouTube participate in the same entrance sequence.
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => { if (node instanceof Element) scan(node); }));
  }).observe(document.body, { childList: true, subtree: true });

  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Element)) return;
    const pending = event.target.closest('.reveal-pending');
    if (pending) reveal(pending);
  });
  motion.addEventListener('change', () => {
    if (motion.matches) document.querySelectorAll('.reveal-prepared').forEach(reveal);
  });
}

export function initializeVisitDirections() {
  const directions = document.querySelector('#indicazioni');
  if (!(directions instanceof HTMLAnchorElement)) return;
  /** @type {ReturnType<typeof setTimeout>|undefined} */
  let highlightTimer;

  const highlight = () => {
    clearTimeout(highlightTimer);
    directions.focus({ preventScroll: true });
    directions.classList.add('is-highlighted');
    highlightTimer = setTimeout(() => directions.classList.remove('is-highlighted'), 4000);
  };
  const highlightFromHash = () => {
    if (window.location.hash === '#dove-trovarci') requestAnimationFrame(highlight);
  };

  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
    const link = event.target.closest('[data-visit-link]');
    if (!(link instanceof HTMLAnchorElement)) return;
    const target = new URL(link.href);
    if (target.origin === location.origin && target.pathname === location.pathname && target.hash === '#dove-trovarci') requestAnimationFrame(highlight);
  });
  window.addEventListener('hashchange', highlightFromHash);
  window.addEventListener('pageshow', highlightFromHash);
  highlightFromHash();
}

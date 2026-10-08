export function initializeNavbar() {
  const header = document.querySelector('.site-header');
  if (header instanceof HTMLElement) {
    let compact = false;
    let framePending = false;
    const updateHeader = () => {
      framePending = false;
      // Separate thresholds avoid flicker when the sticky header changes height.
      const next = window.scrollY > (compact ? 32 : 96);
      if (next === compact) return;
      compact = next;
      header.classList.toggle('is-compact', compact);
    };
    const scheduleHeader = () => {
      if (framePending) return;
      framePending = true;
      requestAnimationFrame(updateHeader);
    };
    window.addEventListener('scroll', scheduleHeader, { passive: true });
    window.addEventListener('pageshow', scheduleHeader);
    updateHeader();
  }
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigazione');
  if (toggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
    nav.classList.add('is-enhanced');
    toggle.hidden = false;
    const closeMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
    document.addEventListener('click', event => {
      if (event.target instanceof Node && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
  }

}

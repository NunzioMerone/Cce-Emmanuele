import { initializeNavigationDropdown } from './navigation-dropdown.js';

export function initializeNavbar() {
  const header = document.querySelector('.site-header');
  let refreshHeader = () => {};
  if (header instanceof HTMLElement) {
    let compact = false;
    let framePending = false;
    const updateHeader = () => {
      framePending = false;
      if (header.classList.contains('is-menu-open')) return;
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
    refreshHeader = scheduleHeader;
    window.addEventListener('scroll', scheduleHeader, { passive: true });
    window.addEventListener('pageshow', scheduleHeader);
    updateHeader();
  }
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#navigazione');
  if (toggle instanceof HTMLButtonElement && nav instanceof HTMLElement) {
    const dropdowns = [...nav.querySelectorAll('.navigation-dropdown')]
      .filter(root => root instanceof HTMLDetailsElement)
      .map(initializeNavigationDropdown)
      .filter(Boolean);
    nav.classList.add('is-enhanced');
    toggle.hidden = false;
    const closeMenu = () => {
      const wasOpen = nav.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      header?.classList.remove('is-menu-open');
      dropdowns.forEach(dropdown => dropdown.close());
      if (wasOpen) refreshHeader();
    };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      if (open) {
        toggle.setAttribute('aria-expanded', 'true');
        nav.classList.add('is-open');
        header?.classList.add('is-menu-open');
      } else closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        event.preventDefault();
        closeMenu();
        toggle.focus({ preventScroll: true });
      }
    });
    document.addEventListener('click', event => {
      if (event.target instanceof Node && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('focusin', event => {
      if (event.target instanceof Node && !nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
  }

}

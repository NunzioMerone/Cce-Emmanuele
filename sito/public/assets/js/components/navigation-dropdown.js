/** Enhances a native disclosure, keeping navigation links usable without JavaScript.
 * @param {HTMLDetailsElement} root @returns {{close:()=>void}|null} */
export function initializeNavigationDropdown(root) {
  const trigger = root.querySelector('summary');
  const links = [...root.querySelectorAll('.navigation-dropdown-list a')]
    .filter(link => link instanceof HTMLAnchorElement);
  if (!(trigger instanceof HTMLElement) || !links.length) return null;

  function close(restoreFocus = false) {
    root.open = false;
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }

  trigger.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
    event.preventDefault();
    event.stopPropagation();
    root.open = true;
    links[event.key === 'ArrowUp' ? links.length - 1 : 0].focus();
  });
  root.addEventListener('keydown', event => {
    if (!root.open) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      close(true);
      return;
    }
    const index = links.findIndex(link => link === document.activeElement);
    if (index < 0) return;
    const targets = {
      ArrowDown: (index + 1) % links.length,
      ArrowUp: (index + links.length - 1) % links.length,
      Home: 0,
      End: links.length - 1,
    };
    if (event.key in targets) {
      event.preventDefault();
      links[targets[/** @type {keyof typeof targets} */ (event.key)]].focus();
    }
  });
  document.addEventListener('pointerdown', event => {
    if (event.target instanceof Node && !root.contains(event.target)) close();
  });
  root.addEventListener('focusout', event => {
    // A missing target can mean the browser window lost focus, rather than a new page control.
    if (event.relatedTarget instanceof Node && !root.contains(event.relatedTarget)) close();
  });
  return { close };
}

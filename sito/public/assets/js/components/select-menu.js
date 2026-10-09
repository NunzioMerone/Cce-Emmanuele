import { icon } from './icon.mjs';

/** @typedef {{refresh:()=>void, close:()=>void}} SelectMenuController */
/** @type {WeakMap<HTMLElement, SelectMenuController>} */
const controllers = new WeakMap();

/** Enhances a native select while preserving its value, change event and no-JS fallback.
 * @param {HTMLElement|null} root @returns {SelectMenuController|null} */
export function initializeSelectMenu(root) {
  if (!root) return null;
  if (controllers.has(root)) return controllers.get(root) || null;
  const select = root.querySelector('[data-select-native]');
  const trigger = root.querySelector('[data-select-trigger]');
  const list = root.querySelector('[data-select-list]');
  const value = root.querySelector('[data-select-value]');
  let options = [...root.querySelectorAll('[data-select-option]')].filter(option => option instanceof HTMLButtonElement);
  if (!(select instanceof HTMLSelectElement) || !(trigger instanceof HTMLButtonElement)
    || !(list instanceof HTMLElement) || !(value instanceof HTMLElement)) return null;
  let optionSignature = JSON.stringify([...select.options].map(option => [option.value, option.textContent]));
  let active = 0;
  let prefix = '';
  let lastTyped = 0;

  function refresh() {
    const signature = JSON.stringify([...select.options].map(option => [option.value, option.textContent]));
    if (signature !== optionSignature) {
      close();
      optionSignature = signature;
      list.replaceChildren(...[...select.options].map(native => {
        const option = document.createElement('button');
        option.type = 'button';
        option.className = 'select-menu-option';
        option.setAttribute('role', 'option');
        option.dataset.selectOption = native.value;
        option.tabIndex = -1;
        const label = document.createElement('span');
        label.textContent = native.textContent;
        option.append(label);
        option.insertAdjacentHTML('beforeend', icon('check'));
        return option;
      }));
      options = [...list.querySelectorAll('[data-select-option]')];
    }
    trigger.disabled = select.disabled || !options.length;
    value.textContent = select.selectedOptions[0]?.textContent || '';
    options.forEach(option => option.setAttribute('aria-selected', String(option.dataset.selectOption === select.value)));
    active = Math.max(0, options.findIndex(option => option.dataset.selectOption === select.value));
  }

  function close(restoreFocus = false) {
    list.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }

  function focusOption(index) {
    active = Math.max(0, Math.min(index, options.length - 1));
    options[active].focus({ preventScroll: true });
    // Scroll only the options, never the page behind the dropdown.
    const option = options[active];
    const top = option.offsetTop;
    const bottom = top + option.offsetHeight;
    if (top < list.scrollTop) list.scrollTop = top;
    else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
  }

  function open(index = active, moveFocus = true) {
    refresh();
    if (trigger.disabled) return;
    prefix = '';
    list.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    if (moveFocus) focusOption(index);
  }

  list.addEventListener('click', event => {
    const option = event.target instanceof Element ? event.target.closest('[data-select-option]') : null;
    if (!(option instanceof HTMLButtonElement)) return;
    const changed = select.value !== option.dataset.selectOption;
    select.value = option.dataset.selectOption || '';
    refresh();
    close(true);
    if (changed) select.dispatchEvent(new Event('change', { bubbles: true }));
  });
  trigger.addEventListener('click', event => {
    if (list.hidden) open(active, event.detail === 0);
    else close();
  });
  trigger.addEventListener('keydown', event => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    open(event.key === 'End' ? options.length - 1 : event.key === 'Home' ? 0 : active);
  });
  list.addEventListener('keydown', event => {
    const targets = { ArrowDown: (active + 1) % options.length, ArrowUp: (active + options.length - 1) % options.length, Home: 0, End: options.length - 1 };
    if (event.key in targets) {
      event.preventDefault();
      focusOption(targets[/** @type {keyof typeof targets} */ (event.key)]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close(true);
    } else if (event.key === 'Tab') {
      // Return to the trigger before the browser advances to the next control.
      close(true);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey && event.key !== ' ') {
      const now = performance.now();
      prefix = `${now - lastTyped > 700 ? '' : prefix}${event.key.toLocaleLowerCase('it')}`;
      lastTyped = now;
      const index = options.findIndex(option => option.textContent.trim().toLocaleLowerCase('it').startsWith(prefix));
      if (index >= 0) { event.preventDefault(); focusOption(index); }
    }
  });
  document.addEventListener('pointerdown', event => { if (event.target instanceof Node && !root.contains(event.target)) close(); });
  root.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || list.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    close(true);
  });
  root.addEventListener('focusout', event => {
    // Safari can report no destination for a pointer click or a window losing focus.
    // Outside pointer presses are handled separately, so they cannot close and reopen the trigger.
    if (event.relatedTarget instanceof Node && !root.contains(event.relatedTarget)) close();
  });
  select.addEventListener('change', refresh);
  const label = root.querySelector('label');
  label?.removeAttribute('for');
  label?.addEventListener('click', () => trigger.focus());
  select.hidden = true;
  trigger.hidden = false;
  refresh();
  const controller = { refresh, close };
  controllers.set(root, controller);
  return controller;
}

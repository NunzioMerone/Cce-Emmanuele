import { initializeCarousel } from './carousel.js';

/** Without JavaScript, anchors and the scrollable track still reach every story. */
export function initializeAboutStories() {
  document.querySelectorAll('[data-story]').forEach(initializeStory);
}

/** @param {Element} root */
function initializeStory(root) {
  const list = root.querySelector('[data-story-steps]');
  const navigation = root.querySelector('[data-story-navigation]');
  const carouselRoot = root.querySelector('[data-carousel]');
  const tabs = [...root.querySelectorAll('[data-story-tab]')].filter(tab => tab instanceof HTMLAnchorElement);
  const panels = [...root.querySelectorAll('[data-story-panel]')].filter(panel => panel instanceof HTMLElement);
  if (!(list instanceof HTMLElement) || !(navigation instanceof HTMLElement)
    || !(carouselRoot instanceof HTMLElement) || !tabs.length || tabs.length !== panels.length) return;
  let activeIndex = -1;
  let initialized = false;

  function positionLine() {
    const first = tabs[0].querySelector('.about-story-step-dot')?.getBoundingClientRect();
    const last = tabs.at(-1)?.querySelector('.about-story-step-dot')?.getBoundingClientRect();
    if (!first || !last) return;
    const bounds = navigation.getBoundingClientRect();
    navigation.style.setProperty('--story-line-left', `${first.left + first.width / 2 - bounds.left}px`);
    navigation.style.setProperty('--story-line-top', `${first.top + first.height / 2 - bounds.top}px`);
    navigation.style.setProperty('--story-line-width', `${last.left + last.width / 2 - first.left - first.width / 2}px`);
  }

  /** @param {number} index */
  function synchronize(index) {
    if (index === activeIndex || !panels[index]) return;
    const animate = initialized;
    activeIndex = index;
    navigation.style.setProperty('--story-progress', String(index / Math.max(1, tabs.length - 1)));
    tabs.forEach((tab, itemIndex) => {
      const selected = itemIndex === index;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle('is-complete', itemIndex < index);
      panels[itemIndex].setAttribute('aria-hidden', String(!selected));
      panels[itemIndex].inert = !selected;
      panels[itemIndex].tabIndex = selected ? 0 : -1;
      panels[itemIndex].classList.toggle('is-entering', selected && animate);
    });
  }

  carouselRoot.addEventListener('carousel:change', event => {
    if (event instanceof CustomEvent && typeof event.detail?.index === 'number') synchronize(event.detail.index);
  });
  const controller = initializeCarousel(carouselRoot);
  if (!controller) return;

  list.setAttribute('role', 'tablist');
  list.setAttribute('aria-orientation', 'horizontal');
  tabs.forEach((tab, index) => {
    tab.parentElement?.setAttribute('role', 'presentation');
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panels[index].id);
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].setAttribute('aria-labelledby', tab.id);
    tab.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      controller.goTo(index);
    });
    tab.addEventListener('keydown', event => {
      const targets = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (event.key in targets) {
        event.preventDefault();
        const target = targets[/** @type {keyof typeof targets} */ (event.key)];
        controller.goTo(target);
        tabs[target].focus({ preventScroll: true });
      } else if (event.key === ' ') {
        event.preventDefault();
        controller.goTo(index);
      }
    });
  });
  root.classList.add('is-enhanced');
  const requestedIndex = panels.findIndex(panel => `#${panel.id}` === location.hash);
  if (requestedIndex > 0) controller.goTo(requestedIndex);
  positionLine();
  initialized = true;
  new ResizeObserver(positionLine).observe(navigation);
  document.fonts.ready.then(positionLine);
}

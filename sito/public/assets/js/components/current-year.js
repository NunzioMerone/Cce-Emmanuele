import { currentYear } from '../utils/calendar.mjs';

export function initializeCurrentYear() {
  const update = () => {
    const year = currentYear();
    document.querySelectorAll('[data-current-year]').forEach(element => { element.textContent = year; });
  };
  update();
  window.addEventListener('pageshow', update);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) update(); });
}

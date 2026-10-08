import { escapeHtml } from '../utils/html.mjs';

/** @param {string} name @param {string} [className] */
export function icon(name, className = '') {
  const paths = {
    music: '<path d="M9 18V5l12-3v13M9 9l12-3"/><ellipse cx="6" cy="18" rx="3" ry="2.5"/><ellipse cx="18" cy="15" rx="3" ry="2.5"/>',
    prayer: '<path d="M12 15V4c0-2-2-2-2 0L8 12l-4 6 5 3 3-6Zm0 0V4c0-2 2-2 2 0l2 8 4 6-5 3-3-6ZM4 18l-2 3m18-3 2 3"/>',
    target: '<circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="m11 13 9-9m-4 0h4v4"/>',
    binoculars: '<path d="M3 15 6 4h3l2 11M21 15 18 4h-3l-2 11M9 7h6M9 13h6"/><circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/>',
    leaf: '<path d="M20 3c0 10-2 17-10 17a7 7 0 0 1-6-10c3-4 9-4 16-7ZM4 22c2-6 6-10 12-14"/>',
    cross: '<path d="M12 3v18M5 8h14"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    external: '<path d="M14 3h7v7m0-7L10 14"/><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5"/>',
    book: '<path d="M12 5v16M12 5C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 1Z"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    people: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-3a7 7 0 0 1 14 0v3m0-18a4 4 0 0 1 0 8m6 10v-3a7 7 0 0 0-4-6"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 7 10-7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 3.1 5.2 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L9 11a16 16 0 0 0 4 4l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z"/>',
    play: '<path d="m9 5 12 7-12 7Z"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 11h18M7 15h2M15 15h2M7 18h2"/>',
    search: '<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
    filter: '<path d="M4 7h7m5 0h4M4 17h3m5 0h8"/><circle cx="13.5" cy="7" r="2.5"/><circle cx="9.5" cy="17" r="2.5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="m10 9 5 3-5 3Z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/>',
    facebook: '<path d="M14 21v-8h3l.5-4H14V7c0-1 .4-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8Z" fill="currentColor" stroke="none"/>',
  };
  return `<svg class="icon ${escapeHtml(className)}" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
}

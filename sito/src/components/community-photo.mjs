import { escapeHtml } from '../utils/html.mjs';

/** @param {import('../config/about.mjs').CommunityPhoto} photo @param {{eager?:boolean}} [options] */
export function communityPhoto(photo, { eager = false } = {}) {
  return `<img src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" width="${photo.width}" height="${photo.height}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}

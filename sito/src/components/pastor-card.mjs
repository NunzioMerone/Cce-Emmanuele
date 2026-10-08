import { contactPlaceholders } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/** @param {{name: string, phone: string, photo: string}} pastor @param {number} [index] */
export function pastorCard(pastor, index = 0) {
  const initials = pastor.name.split(/\s+/).filter(Boolean).map(part => part[0]).join('').slice(0, 3);
  const phone = pastor.phone ? `<a href="tel:${escapeHtml(pastor.phone.replace(/[\s()-]/g, ''))}">${icon('phone')}${escapeHtml(pastor.phone)}</a>`
    : `<span>${icon('phone')}${escapeHtml(contactPlaceholders.phone)}</span>`;
  return `<article class="pastor-card" data-reveal="up" data-reveal-delay="${index * 100}">
    ${pastor.photo ? `<img class="pastor-card-photo" src="${escapeHtml(pastor.photo)}" alt="${escapeHtml(pastor.name)}" width="88" height="88" loading="lazy" decoding="async">` : `<span class="pastor-card-initials" aria-hidden="true">${escapeHtml(initials)}</span>`}
    <h4>${escapeHtml(pastor.name)}</h4>
    <div class="pastor-card-phone">${phone}</div>
  </article>`;
}

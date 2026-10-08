import { button } from './button.mjs';
import { escapeHtml } from '../utils/html.mjs';

/** Neutral geometry only: loading never represents a video or a playback action. */
export function sermonSkeleton(featured = false) {
  return `<div class="sermon-skeleton${featured ? ' sermon-skeleton--featured' : ''}" aria-hidden="true"><div class="skeleton-block sermon-skeleton-image"></div><div class="sermon-skeleton-body"><span class="skeleton-block skeleton-line skeleton-line--short"></span><span class="skeleton-block skeleton-line"></span><span class="skeleton-block skeleton-line skeleton-line--medium"></span></div></div>`;
}

export function sermonSkeletonGrid(count = 4) {
  return `<div class="sermon-skeleton-grid" aria-hidden="true">${Array.from({ length: count }, () => sermonSkeleton()).join('')}</div>`;
}

/** @param {string} message @param {{retry?:boolean, url?:string}} [options] */
export function catalogFeedback(message, { retry = true, url = '' } = {}) {
  return `<span class="catalog-feedback"><span>${escapeHtml(message)}</span><span class="catalog-feedback-actions">${retry ? button({ label: 'Riprova', size: 'small', iconName: null, attributes: { 'data-load-retry': true } }) : ''}${url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Apri il canale YouTube</a>` : ''}</span></span>`;
}

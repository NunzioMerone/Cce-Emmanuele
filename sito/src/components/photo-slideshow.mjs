import { escapeHtml } from '../utils/html.mjs';

/** @param {{photos:import('../config/home.mjs').HeroPhoto[], intervalMs:number}} options */
export function photoSlideshow({ photos, intervalMs }) {
  if (!photos.length) return '';
  return `<div class="photo-slideshow" data-photo-slideshow data-slide-interval="${intervalMs}" role="region" aria-roledescription="carosello" aria-label="Immagini di fede e comunità">
    <div class="photo-slideshow-images" id="home-slideshow-images" aria-live="off">
      ${photos.map((photo, index) => `<img class="photo-slideshow-image photo-slideshow-image--${index + 1}${index === 0 ? ' is-active' : ''}" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" width="${photo.width}" height="${photo.height}" loading="eager" decoding="async" fetchpriority="${index === 0 ? 'high' : 'low'}" aria-hidden="${index !== 0}">`).join('\n      ')}
    </div>
  </div>`;
}

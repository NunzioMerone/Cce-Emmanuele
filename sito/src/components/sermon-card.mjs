import { escapeHtml as esc } from '../utils/html.mjs';
import { icon } from './icon.mjs';
import { external } from './text-link.mjs';
import { dateFormat } from '../utils/dates.mjs';
import { durationLabel } from '../utils/duration.mjs';

/** @param {import('../server/youtube.mjs').Video} video @param {boolean} [featured]
 * @param {{headingLevel?:'h3'|'h4'}} [options] */
export function sermonCard(video, featured = false, options = {}) {
  const duration = durationLabel(video.duration);
  const image = /^https:\/\/(?:i\.ytimg\.com|img\.youtube\.com)\//.test(video.thumbnail) ? video.thumbnail : '';
  const watch = `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`;
  const heading = featured ? 'h2' : options.headingLevel === 'h3' ? 'h3' : 'h4';
  const title = video.embeddable
    ? `<button type="button" class="sermon-title-button" aria-haspopup="dialog" aria-controls="sermon-video-dialog">${esc(video.title)}</button>`
    : esc(video.title);
  const playback = video.embeddable
    ? `<button class="video-load" type="button" aria-label="Riproduci ${esc(video.title)}" aria-haspopup="dialog" aria-controls="sermon-video-dialog">${icon('play')}<span>${featured ? 'Ascolta l’ultimo messaggio' : 'Ascolta il messaggio'}</span></button>`
    : `<a class="video-external" href="${watch}" target="_blank" rel="noopener noreferrer" aria-label="Guarda ${esc(video.title)} su YouTube">${icon('external')}<span>Guarda su YouTube</span></a>`;
  return `<article class="sermon-card${featured ? ' sermon-card--featured' : ''}" data-catalog-video="${esc(video.id)}">
    <div class="video-placeholder" data-video="${esc(video.id)}" data-title="${esc(video.title)}">
      ${image ? `<img src="${esc(image)}" alt="" width="1280" height="720" loading="${featured ? 'eager' : 'lazy'}">` : '<div class="video-no-thumbnail" role="img" aria-label="Anteprima non disponibile"></div>'}
      ${playback}
      ${duration ? `<span class="video-duration">${duration}</span>` : ''}
    </div>
    <div class="sermon-body">
      <time datetime="${esc(video.publishedAt)}">${dateFormat.format(new Date(video.publishedAt))}</time>
      <${heading} class="sermon-title">${title}</${heading}>
      ${featured ? '' : external(watch, 'Guarda su YouTube')}
    </div>
  </article>`;
}

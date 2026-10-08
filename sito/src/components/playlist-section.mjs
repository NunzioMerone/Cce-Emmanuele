import { escapeHtml } from '../utils/html.mjs';
import { OTHER_PLAYLIST } from '../domain/sermons.mjs';
import { sermonUi } from '../config/ui.mjs';
import { sermonCard } from './sermon-card.mjs';
import { button } from './button.mjs';
import { external } from './text-link.mjs';
import { carousel } from './carousel.mjs';

/** @param {{id: string, title: string, videos: import('../server/youtube.mjs').Video[]}} group @param {number} index */
export function playlistSection(group, index) {
  const preview = group.videos.slice(0, sermonUi.playlistPreviewLimit);
  return `<section class="playlist-section" aria-labelledby="playlist-heading-${index}">
    <div class="playlist-heading"><div>
      <p class="eyebrow">${group.id === OTHER_PLAYLIST ? 'Dalla nostra comunità' : 'Una serie da ascoltare'}</p>
      <h3 id="playlist-heading-${index}">${escapeHtml(group.title)}<span>${group.videos.length}</span></h3>
    </div>${group.id !== OTHER_PLAYLIST ? external(`https://www.youtube.com/playlist?list=${encodeURIComponent(group.id)}`, 'Playlist su YouTube') : ''}</div>
    ${carousel({ id: `playlist-carousel-${index}`, label: group.title, minItemWidth: 240, maxVisible: 4, items: preview.map(video => sermonCard(video)) })}
    <div class="playlist-actions">${button({ href: `serie.html?playlist=${encodeURIComponent(group.id)}`, label: 'Tutte le prediche della serie', variant: 'text', attributes: { 'aria-label': `Tutte le prediche di ${group.title}` } })}${group.videos.length > preview.length ? `<p>${preview.length} di ${group.videos.length} messaggi nell’anteprima</p>` : ''}</div>
  </section>`;
}

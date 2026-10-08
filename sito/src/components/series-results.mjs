import { sermonCard } from './sermon-card.mjs';
import { button } from './button.mjs';
import { visibleItems } from '../utils/pagination.mjs';
import { sermonUi } from '../config/ui.mjs';

/** A full series is a responsive grid that expands in batches, preserving earlier cards.
 * @param {{videos:import('../server/youtube.mjs').Video[], visible:number}} options */
export function seriesResults({ videos, visible }) {
  const result = visibleItems(videos, visible, sermonUi.seriesBatchSize);
  const items = result.items.map(video => sermonCard(video, false, { headingLevel: 'h3' })).join('');
  const controls = seriesMore(result);
  return { ...result, itemsMarkup: items, controlsMarkup: controls, markup: videos.length
    ? `<div class="series-grid" id="series-grid">${items}</div>${controls}`
    : '<p class="series-empty">Nessun messaggio corrisponde ai filtri. Prova a cambiare il periodo, la durata o la ricerca.</p>' };
}

/** @param {{count:number,total:number,remaining:number,nextCount:number}} result */
export function seriesMore(result) {
  return result.remaining ? `<div class="series-more">
    <p>${result.count} di ${result.total} messaggi</p>
    ${button({ label: 'Mostra altre prediche', variant: 'text', attributes: { 'data-series-more': true, 'aria-controls': 'series-grid' }, suffix: `<span class="series-more-count">+${result.nextCount - result.count}</span>` })}
  </div>` : '';
}

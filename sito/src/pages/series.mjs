import { sermonSkeletonGrid } from '../components/sermon-loading.mjs';
import { textLink } from '../components/text-link.mjs';
import { catalogToolbar } from '../components/catalog-toolbar.mjs';
import { sermonFilters } from '../components/sermon-filters.mjs';
import { button } from '../components/button.mjs';
import { videoPlayer } from '../components/video-player.mjs';

export function seriesPage() {
  return `<section class="series-page" data-series-app>
    <div class="container">
      <header class="series-heading" data-reveal>
        ${textLink('prediche.html', 'Tutte le prediche', { variant: 'feature' })}
        <p class="eyebrow">Una serie da ascoltare</p>
        <h1 id="series-title">Le prediche della serie.</h1>
        <p id="series-description">Tutti i messaggi della raccolta, da ascoltare nel tuo cammino.</p>
        <div id="series-youtube"></div>
      </header>
      <div data-series-toolbar hidden>
        ${catalogToolbar({ searchId: 'series-search', sortId: 'series-sort', series: true })}
        <div class="catalog-summary">
          <p id="series-count" role="status" aria-live="polite">Caricamento dei messaggi…</p>
          ${button({ label: 'Rimuovi i filtri', variant: 'text', size: 'small', iconName: null, className: 'reset-link', attributes: { id: 'clear-sermon-filters', hidden: true } })}
        </div>
        <div id="active-sermon-filters" class="active-filters"></div>
      </div>
      <p class="catalog-notice" id="series-notice" role="status" hidden></p>
      <h2 class="visually-hidden">Messaggi della serie</h2>
      <div id="series-videos" aria-busy="true">
        ${sermonSkeletonGrid()}
      </div>
      <noscript><p class="catalog-notice">Per vedere i messaggi della serie attiva JavaScript oppure torna alla <a href="prediche.html">pagina Prediche</a>.</p></noscript>
    </div>
  </section>${sermonFilters({ includePlaylists: false })}${videoPlayer()}`;
}

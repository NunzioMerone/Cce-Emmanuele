import { church } from '../config/site.mjs';
import { sermonSkeleton, sermonSkeletonGrid } from '../components/sermon-loading.mjs';
import { invitation } from '../components/invitation.mjs';
import { button } from '../components/button.mjs';
import { sermonFilters } from '../components/sermon-filters.mjs';
import { catalogToolbar } from '../components/catalog-toolbar.mjs';
import { videoPlayer } from '../components/video-player.mjs';

export function sermonsPage() {
  return `<div class="sermons-page" data-sermons-app data-channel-url="${church.youtubeUrl}">
  <section class="container sermons-hero">
    <div class="latest-message">
      <div class="latest-label">
        <p class="eyebrow" id="latest-sermon-label">
          <span class="gold-line"></span>Dal nostro canale</p>
        <span class="latest-marker">Dalla nostra comunità</span>
      </div>
      <div id="latest-sermon" aria-busy="true" aria-live="polite">${sermonSkeleton(true)}<span class="visually-hidden">Caricamento dell’ultimo messaggio…</span></div>
    </div>
    <div class="sermons-intro">
      <p class="eyebrow">Prediche e messaggi</p>
      <h1>La Parola.<br>
        <em>Un cammino<br>che continua.</em>
      </h1>
      <p>Ritrova una predica, segui una serie, lasciati accompagnare da una parola. I messaggi della nostra chiesa, da ascoltare anche durante la settimana.</p>
      ${button({ href: church.youtubeUrl, label: 'Visita il canale YouTube', external: true, iconName: 'external' })}
    </div>
  </section>
  <section class="sermons-archive section--soft" aria-labelledby="archive-title">
    <div class="container">
      <div class="archive-top">
        <div>
          <p class="eyebrow">Un messaggio per il tuo cammino</p>
          <h2 id="archive-title">Esplora le prediche.</h2>
          <p>Le serie e i messaggi, raccolti per playlist.</p>
        </div>
      </div>
      ${catalogToolbar()}
      <div class="catalog-summary">
        <p id="catalog-count" role="status" aria-live="polite">Caricamento della raccolta…</p>
        ${button({ label: 'Rimuovi i filtri', variant: 'text', size: 'small', iconName: null, className: 'reset-link', attributes: { id: 'clear-sermon-filters', hidden: true } })}
      </div>
      <div id="active-sermon-filters" class="active-filters">
      </div>
      <div class="catalog-notice" id="catalog-notice" role="status" hidden>
      </div>
      <div id="playlist-sections" aria-busy="true">${sermonSkeletonGrid()}</div>
      <noscript>
        <div class="catalog-notice">Per esplorare le playlist e usare i filtri attiva JavaScript. Puoi sempre <a href="${church.youtubeUrl}" target="_blank" rel="noopener noreferrer">ascoltare i messaggi sul canale YouTube</a>.</div>
      </noscript>
      <p class="catalog-footnote">I messaggi e le playlist seguono il nostro canale YouTube. Il player si carica quando scegli di riprodurre un video.</p>
    </div>
  </section>
  ${sermonFilters()}
  ${videoPlayer()}
  </div>${invitation()}`;
}

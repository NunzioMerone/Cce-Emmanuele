import { sermonSkeleton } from './sermon-loading.mjs';
import { textLink } from './text-link.mjs';
import { church } from '../config/site.mjs';
import { videoPlayer } from './video-player.mjs';
import { carousel } from './carousel.mjs';

export function sermonPreview() {
  return `<section id="ultime-prediche" class="sermon-preview" data-home-sermons aria-labelledby="home-sermons-title">
    <div class="container">
      <div class="sermon-preview-heading">
        <div>
          <p class="eyebrow"><span class="gold-line" aria-hidden="true"></span>Prediche e messaggi</p>
          <h2 id="home-sermons-title">La Parola che <em>accompagna.</em></h2>
          <p class="sermon-preview-description">Gli ultimi messaggi della nostra chiesa, da ascoltare anche durante la settimana.</p>
        </div>
        ${textLink('prediche.html', 'Tutte le prediche', { variant: 'feature' })}
      </div>
      <p class="sermon-preview-status" data-preview-status role="status">Caricamento degli ultimi messaggi…</p>
      ${carousel({ id: 'home-sermon-carousel', label: 'Ultime prediche', minItemWidth: 260, maxVisible: 3, trackClassName: 'sermon-preview-grid', trackAttributes: { 'data-preview-videos': true, 'aria-busy': 'true' }, items: Array.from({ length: 3 }, () => sermonSkeleton()) })}
      <noscript><p class="sermon-preview-status">Per visualizzare gli ultimi messaggi attiva JavaScript, oppure <a href="${church.youtubeUrl}" target="_blank" rel="noopener noreferrer">visita il nostro canale YouTube</a>.</p></noscript>
    </div>
  </section>${videoPlayer()}`;
}

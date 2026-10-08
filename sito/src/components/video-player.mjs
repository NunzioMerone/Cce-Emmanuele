import { icon } from './icon.mjs';
import { button } from './button.mjs';
import { church } from '../config/site.mjs';

export function videoPlayer() {
  return `<dialog class="video-player-dialog" id="sermon-video-dialog" aria-labelledby="sermon-video-title">
    <div class="video-player-header">
      <div><p class="eyebrow">Prediche e messaggi</p><h2 id="sermon-video-title">Ascolta il messaggio</h2></div>
      <button class="video-player-close" type="button" aria-label="Chiudi il video" autofocus>${icon('close')}</button>
    </div>
    <div class="video-player-stage" data-video-stage></div>
    <div class="video-player-footer">
      ${button({ label: 'Apri su YouTube', href: church.youtubeUrl, variant: 'outline', size: 'small', external: true, iconName: 'external', attributes: { 'data-video-watch': true } })}
    </div>
  </dialog>`;
}

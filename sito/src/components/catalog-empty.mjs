import { button } from './button.mjs';

/** @param {boolean} hasVideos @param {string} channelUrl */
export function catalogEmpty(hasVideos, channelUrl) {
  return `<div class="catalog-empty"><span class="empty-mark" aria-hidden="true">✳</span>
    <h3>${hasVideos ? 'Nessun messaggio con questi filtri.' : 'Il cammino continua su YouTube.'}</h3>
    <p>${hasVideos ? 'Prova un altro periodo, una playlist diversa o rimuovi i filtri.' : 'Le altre prediche compariranno qui quando saranno pubblicate sul canale.'}</p>
    ${hasVideos ? button({ label: 'Mostra tutti i messaggi', variant: 'outline', iconName: null, attributes: { 'data-reset-all': true } }) : button({ label: 'Visita il canale', href: channelUrl, variant: 'outline', iconName: 'external', external: true })}
  </div>`;
}

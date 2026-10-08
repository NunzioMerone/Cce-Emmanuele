import { church } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { textLink } from './text-link.mjs';
import { icon } from './icon.mjs';

export function churchMap() {
  return `<div class="church-map">
    <div class="church-map-canvas">
      ${church.mapsEmbedUrl ? `<iframe src="${escapeHtml(church.mapsEmbedUrl)}" title="Mappa della chiesa in ${escapeHtml(church.address)}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>` : `<div class="church-map-fallback">${icon('pin')}<span>${escapeHtml(church.address)}</span></div>`}
    </div>
    <div class="church-map-address">
      <span class="church-map-pin">${icon('pin')}</span>
      <p><strong>${escapeHtml(church.streetAddress)}</strong><span>${escapeHtml(church.postalCode)} ${escapeHtml(church.locality)}</span></p>
      ${textLink(church.mapsUrl, 'Indicazioni', { external: true, variant: 'feature', id: 'indicazioni', className: 'church-map-directions', ariaLabel: 'Indicazioni per la chiesa su Google Maps' })}
    </div>
  </div>`;
}

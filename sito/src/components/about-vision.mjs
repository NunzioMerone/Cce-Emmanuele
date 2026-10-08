import { missionVision } from '../config/about.mjs';
import { icon } from './icon.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutVision() {
  return `<section class="about-vision about-section" id="visione" aria-labelledby="vision-title">
    <div class="container">
      <header class="about-section-heading about-section-heading--center" data-reveal><p class="eyebrow">La nostra identità</p><h2 id="vision-title">Missione e <em>visione</em></h2></header>
      <div class="about-mission-grid">${missionVision.map(item => `<article class="about-mission-card" data-reveal><span class="about-mission-icon">${icon(item.icon)}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div></article>`).join('')}</div>
    </div>
  </section>`;
}

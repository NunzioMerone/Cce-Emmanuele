import { beliefs as items } from '../config/about.mjs';
import { icon } from './icon.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function beliefs() {
  return `<section class="about-beliefs about-section" id="fede" aria-labelledby="beliefs-title"><div class="container">
    <header class="about-section-heading" data-reveal><p class="eyebrow">I nostri valori</p><h2 id="beliefs-title">Ciò in cui <em>crediamo.</em></h2></header>
    <div class="beliefs-grid">${items.map(item => `<article class="belief-card" data-reveal><span class="belief-card-symbol">${icon(item.icon)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`).join('')}</div>
  </div></section>`;
}

import { beliefs as items, aboutCopy } from '../config/about.mjs';
import { icon } from './icon.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function beliefs() {
  return `<section class="about-beliefs about-section" id="fede" aria-labelledby="beliefs-title"><div class="container">
    <header class="about-section-heading" data-reveal><p class="eyebrow">I nostri valori</p><h2 id="beliefs-title">La fede <em>che ci unisce.</em></h2><p class="about-beliefs-intro">${escapeHtml(aboutCopy.faith)}</p></header>
    <div class="beliefs-grid">${items.map(item => `<article class="belief-card" data-reveal><span class="belief-card-symbol">${icon(item.icon)}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div></article>`).join('')}</div>
  </div></section>`;
}

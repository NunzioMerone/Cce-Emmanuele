import { bacoliPhoto, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutTerritory() {
  return `<section class="about-territory" aria-labelledby="territory-title">
    <div class="about-territory-photo">${communityPhoto(bacoliPhoto)}</div>
    <div class="container about-territory-layout">
      <div class="about-territory-copy" data-reveal><p class="eyebrow">Il nostro territorio</p><h2 id="territory-title">A Bacoli, <em>e oltre.</em></h2><p>${escapeHtml(aboutCopy.territory)}</p></div>
      <p class="about-territory-note" data-reveal>Una speranza<br>per il nostro territorio</p>
    </div>
    <p class="container about-photo-credit"><a href="${escapeHtml(bacoliPhoto.source)}" target="_blank" rel="noopener noreferrer">Panorama di Bacoli · ${escapeHtml(bacoliPhoto.author)}</a></p>
  </section>`;
}

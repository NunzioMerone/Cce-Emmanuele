import { communityGallery as photos, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function communityGallery() {
  return `<section class="about-community about-section" id="comunita" aria-labelledby="community-title"><div class="container">
    <header class="about-section-heading about-community-heading" data-reveal><div><p class="eyebrow">Una chiesa in famiglia</p><h2 id="community-title">Una comunità viva e <em>accogliente.</em></h2></div><p>${escapeHtml(aboutCopy.short)}</p></header>
    <div class="community-gallery">${photos.map(photo => `<figure class="community-gallery-photo" data-reveal><div class="community-gallery-image">${communityPhoto(photo)}</div><figcaption><strong>${escapeHtml(photo.caption)}</strong><p>${escapeHtml(aboutCopy.brief)}</p></figcaption></figure>`).join('')}</div>
  </div></section>`;
}

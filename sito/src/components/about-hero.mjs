import { communityPhotos, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { button } from './button.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutHero() {
  return `<section class="about-hero" aria-labelledby="about-title">
    <div class="about-hero-photo">${communityPhoto(communityPhotos.community, { eager: true })}</div>
    <div class="container about-hero-layout">
      <div class="about-hero-copy" data-reveal>
        <p class="eyebrow">Una famiglia, sempre aperta</p>
        <h1 id="about-title">Chi <em>siamo</em></h1>
        <p class="about-hero-description">${escapeHtml(aboutCopy.short)}</p>
        <div class="about-hero-actions">${button({ href: '#storia', label: 'Scopri la nostra storia', variant: 'gold', size: 'small' })}</div>
      </div>
      <p class="about-hero-caption" data-reveal>Insieme<br>per un domani<br>più luminoso</p>
    </div>
  </section>`;
}

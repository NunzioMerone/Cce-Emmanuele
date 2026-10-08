import { churchTimeline, bacoliPhoto, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutStory() {
  return `<section class="about-story-section about-section" id="storia" aria-labelledby="story-title">
    <div class="about-story-backdrop" aria-hidden="true">${communityPhoto({ ...bacoliPhoto, alt: '' })}</div>
    <div class="container about-story-layout">
      <header class="about-story-heading" data-reveal>
        <p class="eyebrow">La nostra storia</p>
        <h2 id="story-title">Un cammino<br><em>di fede.</em></h2>
        <span class="about-story-rule" aria-hidden="true"></span>
        <p>${escapeHtml(aboutCopy.short)}</p>
      </header>
      <ol class="about-timeline" aria-label="Il nostro cammino">${churchTimeline.map((item, index) => `<li data-reveal data-reveal-delay="${index * 80}"><span class="about-timeline-label">${escapeHtml(item.label)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></li>`).join('')}</ol>
      <p class="about-story-note" data-reveal>Ogni storia<br>ha un inizio,<br>la nostra continua…</p>
    </div>
    <p class="container about-photo-credit"><a href="${escapeHtml(bacoliPhoto.source)}" target="_blank" rel="noopener noreferrer">Panorama di Bacoli · Foto ${escapeHtml(bacoliPhoto.author)}</a></p>
  </section>`;
}

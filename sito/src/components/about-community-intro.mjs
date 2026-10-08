import { communityPhotos, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { textLink } from './text-link.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutCommunityIntro() {
  return `<section class="about-intro about-section" aria-labelledby="about-intro-title">
    <div class="container about-intro-layout">
      <div class="about-intro-copy" data-reveal>
        <p class="eyebrow">La nostra chiesa</p>
        <h2 id="about-intro-title">Una comunità<br><em>aperta a tutti.</em></h2>
        <span class="about-intro-rule" aria-hidden="true"></span>
        <p>${escapeHtml(aboutCopy.short)}</p>
        ${textLink('#visione', 'Scopri di più', { variant: 'feature' })}
      </div>
      <div class="about-intro-visual">
        <figure class="about-intro-image" data-reveal="photo">${communityPhoto(communityPhotos.gathering)}</figure>
        <blockquote class="about-intro-quote" data-reveal data-reveal-delay="120">“${escapeHtml(aboutCopy.quote)}”<span aria-hidden="true"></span></blockquote>
      </div>
    </div>
  </section>`;
}

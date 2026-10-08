import { communityPhotos, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutCommunityIntro() {
  return `<section class="about-intro about-section" id="missione" aria-labelledby="about-intro-title">
    <div class="container about-intro-layout">
      <div class="about-intro-copy" data-reveal>
        <p class="eyebrow">La nostra missione</p>
        <h2 id="about-intro-title">Conoscere Cristo<br><em>e farlo conoscere.</em></h2>
        <span class="about-intro-rule" aria-hidden="true"></span>
        <p>${escapeHtml(aboutCopy.mission)}</p>
      </div>
      <div class="about-intro-visual">
        <figure class="about-intro-image" data-reveal="photo">${communityPhoto(communityPhotos.gathering)}</figure>
        <blockquote class="about-intro-quote" data-reveal data-reveal-delay="120">${escapeHtml(aboutCopy.name)}<span aria-hidden="true"></span></blockquote>
      </div>
    </div>
  </section>`;
}

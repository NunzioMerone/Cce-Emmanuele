import { homeAboutPhotos } from '../config/home.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { textLink } from './text-link.mjs';

export function homeAboutIntro() {
  return `<section id="comunita" class="home-about-intro" aria-labelledby="home-about-title">
    <div class="container home-about-intro-layout">
      <div class="home-about-intro-collage">
        ${homeAboutPhotos.map((photo, index) => `<img class="home-about-intro-photo home-about-intro-photo--${photo.position}" data-reveal="photo" data-reveal-delay="${index * 100}" src="${escapeHtml(photo.src)}" alt="${escapeHtml(photo.alt)}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">`).join('\n        ')}
      </div>
      <div class="home-about-intro-copy">
        <p class="eyebrow home-about-intro-eyebrow"><span class="gold-line" aria-hidden="true"></span>La nostra comunità</p>
        <h2 id="home-about-title"><span>Una chiesa fatta</span> <span>di persone, fede</span> <span>e <em>vita condivisa</em></span></h2>
        <p class="home-about-intro-description">Siamo una comunità cristiana evangelica. Ci ritroviamo per ascoltare la Parola di Dio, pregare insieme e costruire relazioni autentiche, con il desiderio di conoscere Cristo e farlo conoscere.</p>
        ${textLink('chi-siamo.html', 'Scopri chi siamo', { variant: 'feature' })}
      </div>
    </div>
  </section>`;
}

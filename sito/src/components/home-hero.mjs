import { church } from '../config/site.mjs';
import { homeSlideshow } from '../config/home.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { button } from './button.mjs';
import { icon } from './icon.mjs';
import { photoSlideshow } from './photo-slideshow.mjs';

export function homeHero() {
  return `<section class="home-hero" aria-labelledby="home-title">
    <div class="home-hero-visual" data-reveal="photo">
      ${photoSlideshow(homeSlideshow)}
    </div>
    <div class="home-hero-copy">
      <p class="eyebrow home-hero-eyebrow" data-reveal="up"><span class="gold-line"></span>Conoscere Cristo e farlo conoscere</p>
      <h1 id="home-title"><span data-reveal="up" data-reveal-delay="80">Un luogo dove</span>
        <span data-reveal="up" data-reveal-delay="180">conoscere Cristo</span>
        <span data-reveal="up" data-reveal-delay="280">e crescere <em>insieme</em></span></h1>
      <p class="home-hero-description" data-reveal="up" data-reveal-delay="340">Ogni domenica ci ritroviamo per lodare Dio, ascoltare la Sua Parola e vivere momenti autentici di comunione, preghiera e crescita insieme.</p>
      <div class="home-hero-actions" data-reveal="up" data-reveal-delay="400">
        ${button({ href: 'chi-siamo.html', label: 'Scopri di più', size: 'large' })}
        ${button({ href: 'prediche.html', label: 'Guarda le prediche', variant: 'accent-outline', size: 'large', iconName: 'play', iconPosition: 'start' })}
      </div>
      <div class="home-hero-meeting" data-reveal="up" data-reveal-delay="460">${icon('calendar')}<div><p>${escapeHtml(church.meetingTimes)}</p><span>Ti aspettiamo!</span></div></div>
      <figure class="home-hero-quote" data-reveal="up" data-reveal-delay="520"><span class="gold-line" aria-hidden="true"></span><blockquote>“Dove due o tre sono riuniti<br> nel mio nome, lì sono io in mezzo a loro.”</blockquote><figcaption>Matteo 18:20</figcaption></figure>
    </div>
  </section>`;
}

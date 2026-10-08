import { church } from '../config/site.mjs';
import { pastors } from '../config/pastors.mjs';
import { homeWelcomePhoto } from '../config/home.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { button } from './button.mjs';
import { icon } from './icon.mjs';
import { churchMap } from './church-map.mjs';
import { pastorCard } from './pastor-card.mjs';
import { handwrittenNote } from './handwritten-note.mjs';

function socialProfiles() {
  const profiles = [
    { url: church.instagramUrl, label: 'Instagram', iconName: 'instagram', description: 'Foto e storie' },
    { url: church.youtubeUrl, label: 'YouTube', iconName: 'youtube', description: 'Prediche e messaggi' },
    { url: church.facebookUrl, label: 'Facebook', iconName: 'facebook', description: 'La nostra comunità' },
  ].filter(profile => profile.url);
  return `<div class="visit-social-profiles">${profiles.map(profile => `<a class="visit-social-profile" href="${escapeHtml(profile.url)}" target="_blank" rel="noopener noreferrer" aria-label="Segui la chiesa su ${profile.label}">
    <span class="visit-social-icon">${icon(profile.iconName)}</span><strong>${profile.label}</strong><span>${profile.description}</span>
  </a>`).join('')}</div>`;
}

export function homeVisit() {
  return `<section id="accoglienza" class="home-welcome" aria-labelledby="home-welcome-title">
    <div class="container home-welcome-layout">
      <div class="home-welcome-copy" data-reveal="up">
        <p class="eyebrow">Una famiglia, sempre aperta<span class="gold-line" aria-hidden="true"></span></p>
        <h2 id="home-welcome-title">Non devi fare<br>questo cammino<br><em>da solo.</em></h2>
        <p class="home-welcome-description">Che sia la tua prima volta o che tu abbia bisogno di ascolto, siamo qui per accoglierti e camminare con te.</p>
        ${button({ href: '#dove-trovarci', label: 'Vieni a trovarci', variant: 'gold', size: 'large', iconName: 'pin', iconPosition: 'start', suffix: icon('arrow', 'button-icon button-icon--arrow'), attributes: { 'data-visit-link': true } })}
        <figure class="home-welcome-quote"><blockquote>“Portate i pesi gli uni degli altri.”</blockquote><figcaption>Galati 6:2</figcaption></figure>
      </div>
      <figure class="home-welcome-visual" data-reveal="photo" data-reveal-delay="100">
        <img src="${escapeHtml(homeWelcomePhoto.src)}" alt="${escapeHtml(homeWelcomePhoto.alt)}" width="${homeWelcomePhoto.width}" height="${homeWelcomePhoto.height}" loading="lazy">
        ${handwrittenNote('Sei il benvenuto', { tag: 'figcaption', className: 'home-welcome-signature' })}
      </figure>
    </div>
  </section>
  <section class="home-visit-details" aria-label="Dove trovarci e come contattarci">
    <div class="container home-visit-layout">
      <div id="dove-trovarci" class="visit-location">
        <div class="visit-section-heading" data-reveal="up">
          <p class="eyebrow">Ti aspettiamo<span class="gold-line" aria-hidden="true"></span></p>
          <h2>Dove trovarci</h2>
          <p>La nostra chiesa è a Bacoli, nel cuore della nostra comunità.</p>
        </div>
        <div class="visit-map" data-reveal="up">${churchMap()}</div>
      </div>
      <figure class="visit-location-quote" data-reveal="up"><blockquote>“Venite a me, voi tutti che siete stanchi e oppressi,<br>e io vi darò ristoro.”</blockquote><figcaption>Matteo 11:28</figcaption></figure>
      <div class="visit-connections">
        <section class="visit-social-section" aria-labelledby="visit-social-title" data-reveal="up">
          <div class="visit-section-heading">
            <p class="eyebrow">Resta connesso<span class="gold-line" aria-hidden="true"></span></p>
            <h2 id="visit-social-title">Seguici</h2>
            <p>Rimani aggiornato su eventi, messaggi e vita di chiesa.</p>
          </div>
          ${socialProfiles()}
        </section>
        <section class="visit-pastors-section" aria-labelledby="visit-pastors-title">
          <div class="visit-section-heading" data-reveal="up">
            <p class="eyebrow">Siamo qui per te<span class="gold-line" aria-hidden="true"></span></p>
            <h3 id="visit-pastors-title">Contatti</h3>
            <p>Per qualsiasi informazione, non esitare a contattarci.</p>
          </div>
          <div class="visit-pastors-grid">${pastors.map(pastorCard).join('')}</div>
        </section>
      </div>
      <div class="visit-listening-note" data-reveal="up">${handwrittenNote('Siamo felici di ascoltarti')}</div>
    </div>
  </section>`;
}

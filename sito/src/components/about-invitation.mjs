import { button } from './button.mjs';
import { bacoliPhoto, aboutCopy } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutInvitation() {
  return `<section class="about-invitation" aria-labelledby="about-invitation-title">
    <div class="container about-invitation-layout"><div data-reveal><p class="eyebrow">Una famiglia, sempre aperta</p><h2 id="about-invitation-title">Vieni a trovarci,<br><em>ti aspettiamo!</em></h2></div><div class="about-invitation-copy" data-reveal><p>${escapeHtml(aboutCopy.short)}</p>${button({ href: 'index.html#dove-trovarci', label: 'Vieni a trovarci', variant: 'gold', size: 'small' })}</div></div>
    <figure class="about-invitation-photo">${communityPhoto(bacoliPhoto)}<figcaption>Bacoli è casa nostra</figcaption></figure>
  </section>`;
}

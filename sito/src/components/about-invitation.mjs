import { button } from './button.mjs';
import { aboutCopy } from '../config/about.mjs';
import { escapeHtml } from '../utils/html.mjs';

export function aboutInvitation() {
  return `<section class="about-invitation" aria-labelledby="about-invitation-title">
    <div class="container about-invitation-layout"><div data-reveal><p class="eyebrow">Sempre una porta aperta</p><h2 id="about-invitation-title">C’è spazio anche<br><em>per le tue domande.</em></h2></div><div class="about-invitation-copy" data-reveal><p>${escapeHtml(aboutCopy.invitation)}</p>${button({ href: 'contatti.html#incontriamoci', label: 'Vieni a conoscerci', variant: 'gold', size: 'small' })}</div></div>
  </section>`;
}

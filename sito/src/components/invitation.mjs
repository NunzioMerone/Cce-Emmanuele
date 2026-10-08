import { button } from './button.mjs';
export function invitation() {
  return `<section class="invitation"><div class="container invitation-inner"><div><p class="eyebrow">C'è un posto anche per te</p><h2>Un primo passo.<br>Una porta aperta.</h2><p>Che tu conosca già la fede o abbia delle domande,<br class="desktop-break"> ci piacerebbe conoscerti.</p></div>${button({ href: 'contatti.html#incontriamoci', label: 'Preparati alla prima visita', variant: 'light' })}</div></section>`;
}

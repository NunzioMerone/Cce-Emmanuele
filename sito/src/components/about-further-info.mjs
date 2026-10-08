import { icon } from './icon.mjs';

export function aboutFurtherInfo() {
  return `<section class="about-further-info about-section" aria-labelledby="further-info-title"><div class="container about-further-info-layout">
    <header data-reveal><p class="eyebrow">Per approfondire</p><h2 id="further-info-title">Vuoi saperne di più?</h2><p>Approfondisci la nostra fede e il nostro modo di vivere la comunità.</p></header>
    <div class="about-further-links" data-reveal>
      <a class="about-further-link" href="la-nostra-fede.html">${icon('book', 'about-further-symbol')}<span>La nostra fede</span>${icon('arrow', 'about-further-arrow')}</a>
      <a class="about-further-link" href="identita-vita-comunitaria.html">${icon('people', 'about-further-symbol')}<span>Identità e vita comunitaria</span>${icon('arrow', 'about-further-arrow')}</a>
    </div>
  </div></section>`;
}

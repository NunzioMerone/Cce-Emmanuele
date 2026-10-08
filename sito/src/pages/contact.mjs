import { contactHeroPhoto, contactQuestions, visitInformation } from '../config/contact.mjs';
import { bacoliPhoto } from '../config/about.mjs';
import { escapeHtml as esc } from '../utils/html.mjs';
import { icon } from '../components/icon.mjs';
import { button } from '../components/button.mjs';
import { textLink } from '../components/text-link.mjs';
import { church } from '../config/site.mjs';
import { pastors } from '../config/pastors.mjs';
import { contactForm } from '../components/contact-form.mjs';
import { churchMap } from '../components/church-map.mjs';
import { communityPhoto } from '../components/community-photo.mjs';

const eyebrow = label => `<p class="eyebrow"><span class="gold-line" aria-hidden="true"></span>${esc(label)}</p>`;
const visitButton = label => button({ href: '#dove-trovarci', label, attributes: { 'data-visit-link': true } });

/** @param {{staticPreview?:boolean}} [options] */
export function contact({ staticPreview = false } = {}) {
  return `<section class="contact-hero" aria-labelledby="contact-title">
    <div class="contact-hero-photo">${communityPhoto(contactHeroPhoto, { eager: true })}</div>
    <div class="container contact-hero-layout"><div class="contact-hero-copy" data-reveal>
      ${eyebrow('Una comunità che ti accoglie')}<h1 id="contact-title">Vieni a trovarci<span><em>Saremo felici di conoscerti.</em></span></h1>
      <p>Puoi partecipare ai nostri incontri o contattarci per una domanda. In questa pagina trovi gli orari, i recapiti e le indicazioni per raggiungere la chiesa.</p>
      <div class="button-row">${visitButton('Vieni a conoscerci')}${button({ href: '#scrivici', label: 'Scrivici', iconName: 'mail', iconPosition: 'start', variant: 'accent-outline' })}</div>
      <blockquote>“Accoglietevi gli uni gli altri come Cristo ha accolto voi, per la gloria di Dio.”<cite>Romani 15:7</cite></blockquote>
    </div></div>
  </section>
  <section class="contact-section contact-first-visit" id="incontriamoci" aria-labelledby="visit-title"><div class="container">
    <div class="contact-section-heading" data-reveal>${eyebrow('Benvenuto tra noi')}<h2 id="visit-title">La tua prima volta <em>da noi.</em></h2><p>Le informazioni utili per organizzare la tua visita: i nostri incontri, come raggiungerci e lo spazio dedicato ai bambini.</p></div>
    <div class="contact-visit-grid">${visitInformation.map(item => `<article class="contact-visit-card" data-reveal>${icon(item.icon)}<h3>${esc(item.title)}</h3>${item.detail ? `<p class="contact-visit-time">${esc(item.detail)}</p>` : ''}<p>${esc(item.description)}</p></article>`).join('')}</div>
  </div></section>
  <section class="contact-section contact-support" id="scrivici" aria-labelledby="support-title"><div class="container contact-support-layout">
    <div class="contact-support-copy" data-reveal><div class="contact-section-heading">${eyebrow('Ascolto e preghiera')}<h2 id="support-title">Possiamo pregare <em>per te.</em></h2><p>Ci sono momenti in cui fa bene sapere che qualcuno prega con noi. Se ti va, raccontaci quello che stai vivendo.</p><p>Questo spazio è anche per una domanda, per conoscerci meglio o per organizzare la tua prima visita.</p></div>
      <blockquote>“Pregate gli uni per gli altri, affinché siate guariti.”<cite>Giacomo 5:16</cite></blockquote>
      <div class="contact-support-direct"><p>Preferisci parlarne con noi?</p><a class="contact-support-email" href="mailto:${esc(church.email)}">${icon('mail')}<span>${esc(church.email)}</span></a><div class="contact-support-pastors">${pastors.map(pastor => `<a href="tel:${esc(pastor.phone.replace(/\s/g, ''))}">${icon('phone')}<span><strong>${esc(pastor.name)}</strong><span>${esc(pastor.phone)}</span></span></a>`).join('')}</div></div>
    </div>
    <div class="contact-support-panel" data-reveal>${contactForm({ delivery: staticPreview ? 'email' : 'server' })}</div>
  </div></section>
  <section class="contact-section contact-faq" aria-labelledby="faq-title"><div class="container">
    <div class="contact-faq-heading"><div class="contact-section-heading" data-reveal>${eyebrow('Prima di conoscerci')}<h2 id="faq-title">Qualche risposta, <em>per iniziare.</em></h2><p>Le domande di una prima visita. Se ne hai altre, siamo qui per ascoltarti.</p></div><div class="contact-faq-link" data-reveal><p>Non trovi la risposta che cerchi?</p>${textLink('#scrivici', 'Scrivici', { variant: 'feature' })}</div></div>
    <div class="contact-faq-grid">${contactQuestions.map((item, index) => `<details class="contact-question" data-reveal><summary><span class="contact-question-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><span class="contact-question-label">${esc(item.question)}</span><span aria-hidden="true" class="contact-question-toggle"></span></summary><p>${esc(item.answer)}</p></details>`).join('')}</div>
  </div></section>
  <section class="contact-bacoli" aria-labelledby="bacoli-title"><figure><img src="${esc(bacoliPhoto.src)}" alt="${esc(bacoliPhoto.alt)}" width="${bacoliPhoto.width}" height="${bacoliPhoto.height}" loading="lazy"></figure><div class="container contact-bacoli-layout"><div data-reveal>${eyebrow('Chiesa Emmanuele · Bacoli')}<h2 id="bacoli-title">Partecipa ai nostri <em>incontri.</em></h2><p>Puoi partecipare al culto della domenica o allo studio della Parola del giovedì. Qui sotto trovi la mappa e le indicazioni per raggiungerci.</p>${button({ href: '#dove-trovarci', label: 'Vieni a trovarci', variant: 'gold', attributes: { 'data-visit-link': true } })}</div></div></section>
  <section class="contact-section contact-location" id="dove-trovarci" aria-labelledby="location-title"><div class="container contact-location-layout" data-reveal><div class="contact-section-heading">${eyebrow('Ci vediamo qui')}<h2 id="location-title">Ti aspettiamo <em>qui.</em></h2><p>Via Gaetano De Rosa 81, a Bacoli. Apri le indicazioni e vieni a conoscerci.</p></div>${churchMap()}</div></section>`;
}

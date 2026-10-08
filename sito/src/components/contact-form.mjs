import { church } from '../config/site.mjs';
import { escapeHtml as esc } from '../utils/html.mjs';
import { icon } from './icon.mjs';
import { button } from './button.mjs';

/** One message form for prayer requests and enquiries.
 * @param {{delivery?:'server'|'email'}} [options] */
export function contactForm({ delivery = 'server' } = {}) {
  return `<form class="contact-form contact-form--unified" data-contact-form data-form-kind="prayer" data-delivery="${esc(delivery)}" data-recipient="${esc(church.email)}" hidden>
    <fieldset class="contact-topics"><legend>Come possiamo esserti vicini?</legend>
      <label class="contact-topic"><input type="radio" name="topic" value="prayer" checked>${icon('heart')}<span>Una preghiera</span></label>
      <label class="contact-topic"><input type="radio" name="topic" value="message">${icon('mail')}<span>Una domanda</span></label>
    </fieldset>
    <label for="contact-message"><span data-message-label>Raccontaci per cosa possiamo pregare</span><textarea id="contact-message" name="message" rows="6" maxlength="3000" required placeholder="Scrivi quello che desideri condividere…"></textarea></label>
    <label class="contact-checkbox" data-callback-label><input type="checkbox" name="callback" data-contact-callback>Vorrei essere ricontattato</label>
    <div class="contact-callback-fields" data-callback-fields hidden>
      <label for="contact-name"><span>Il tuo nome <span aria-hidden="true">*</span></span><input id="contact-name" name="name" autocomplete="name" maxlength="100" placeholder="Come ti chiami?" disabled></label>
      <label for="contact-email"><span>La tua email <span aria-hidden="true">*</span></span><input id="contact-email" name="email" type="email" autocomplete="email" maxlength="254" placeholder="Dove possiamo risponderti?" disabled></label>
    </div>
    <label class="contact-honeypot" aria-hidden="true">Sito web<input name="website" tabindex="-1" autocomplete="off"></label>
    <p class="contact-form-note" data-delivery-note>${delivery === 'email' ? 'In questa anteprima il pulsante apre la tua app di posta con il messaggio compilato. Per inviarlo, conferma l’invio nella tua app.' : 'Il messaggio arriverà all’email della chiesa. Nome ed email servono soltanto se desideri una risposta.'}</p>
    ${button({ label: delivery === 'email' ? 'Apri la tua email' : 'Invia alla chiesa', type: 'submit', attributes: { 'data-contact-submit': true } })}
    <p class="contact-form-status" role="status" data-form-status hidden></p>
  </form><noscript><p>Scrivici direttamente a <a href="mailto:${esc(church.email)}">${esc(church.email)}</a>.</p></noscript>`;
}

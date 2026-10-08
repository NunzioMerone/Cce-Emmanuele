import { church } from '../config/site.mjs';
import { weeklyMeetings } from '../config/appointments.mjs';
import { pastors } from '../config/pastors.mjs';
import { escapeHtml as esc } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/** Shared confirmed contact details, without duplicated addresses or schedules. */
export function contactDetails({ photo = false } = {}) {
  return `<aside class="contact-details" aria-label="Recapiti e orari della chiesa" data-reveal>
    ${photo ? '<img class="contact-details-photo" src="assets/images/chiesa/incontro-in-chiesa.webp" alt="Un incontro nella sala della Chiesa Emmanuele" width="1600" height="1200" loading="lazy">' : ''}
    <h3>Chiesa Emmanuele</h3>
    <address>
      <div>${icon('pin')}<span><strong>${esc(church.streetAddress)}</strong><br>${esc(church.postalCode)} ${esc(church.locality)}</span></div>
      <div>${icon('mail')}<a href="mailto:${esc(church.email)}">${esc(church.email)}</a></div>
      ${pastors.map(pastor => `<div>${icon('phone')}<span><span class="contact-person-name">${esc(pastor.name)}</span><a href="tel:${esc(pastor.phone.replace(/\s/g, ''))}">${esc(pastor.phone)}</a></span></div>`).join('')}
    </address>
    <div class="contact-hours">${icon('clock')}<div><h4>I nostri incontri</h4><dl>${weeklyMeetings.map(meeting => `<div><dt>${esc(meeting.kind)} · ${esc(meeting.day.toLocaleLowerCase('it-IT'))}</dt><dd>${esc(meeting.time)}</dd></div>`).join('')}</dl></div></div>
  </aside>`;
}

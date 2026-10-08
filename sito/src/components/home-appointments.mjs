import { weeklyMeetings } from '../config/appointments.mjs';
import { church } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';
import { textLink } from './text-link.mjs';

export function homeAppointments() {
  return `<section id="appuntamenti" class="home-appointments" aria-labelledby="home-appointments-title">
    <div class="container">
      <div class="home-appointments-heading">
        <div data-reveal="up">
          <p class="eyebrow"><span class="gold-line" aria-hidden="true"></span>I nostri appuntamenti</p>
          <h2 id="home-appointments-title">Insieme, intorno alla <em>Parola.</em></h2>
        </div>
      </div>
      <div class="home-appointments-grid">
        ${weeklyMeetings.map((meeting, index) => `<article class="meeting-card" data-reveal="up" data-reveal-delay="${index * 100}">
          <div class="meeting-card-schedule">
            <span class="meeting-card-day">Ogni ${escapeHtml(meeting.day.toLocaleLowerCase('it-IT'))}</span>
            <p class="meeting-card-time"><span>ore</span> <time datetime="${escapeHtml(meeting.time)}">${escapeHtml(meeting.time)}</time></p>
          </div>
          <div class="meeting-card-details">
            <span class="meeting-card-icon">${icon(meeting.iconName)}</span>
            <h3>${escapeHtml(meeting.title)}</h3>
            <p>${escapeHtml(meeting.description)}</p>
          </div>
        </article>`).join('')}
      </div>
      <aside class="home-appointments-social" aria-labelledby="home-events-title" data-reveal="up">
        <div class="home-appointments-social-copy">
          <h3 id="home-events-title">E gli altri eventi?</h3>
          <p>Per gli incontri speciali e tutte le novità, segui gli aggiornamenti sulle nostre pagine social.</p>
        </div>
        <div class="home-appointments-social-links">
          ${church.instagramUrl ? textLink(church.instagramUrl, 'Seguici su Instagram', { external: true, variant: 'feature', iconName: 'instagram' }) : ''}
          ${church.facebookUrl ? textLink(church.facebookUrl, 'Seguici su Facebook', { external: true, variant: 'feature', iconName: 'facebook' }) : ''}
        </div>
      </aside>
    </div>
  </section>`;
}

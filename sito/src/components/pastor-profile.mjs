import { pastors } from '../config/pastors.mjs';
import { escapeHtml } from '../utils/html.mjs';

/** @param {typeof pastors[number]} pastor */
export function pastorProfile(pastor) {
  return `<article class="pastor-profile" data-reveal>
    <div class="pastor-profile-photo"><img src="${escapeHtml(pastor.photo)}" alt="${escapeHtml(pastor.name)}, pastore della Chiesa Emmanuele" width="1122" height="1402" loading="lazy" decoding="async"></div>
    <div class="pastor-profile-copy"><h3>${escapeHtml(pastor.name)}</h3><p>${escapeHtml(pastor.presentation)}</p><span class="about-copy-rule" aria-hidden="true"></span></div>
  </article>`;
}

export function aboutPastors() {
  return `<section class="about-pastors about-section" id="pastori" aria-labelledby="pastors-title"><div class="container">
    <header class="about-section-heading about-section-heading--split" data-reveal><div><p class="eyebrow">I nostri pastori</p><h2 id="pastors-title">Al servizio<br><em>della comunità.</em></h2></div><blockquote class="about-section-quote"><p>“Vi esorto dunque, fratelli, per le misericordie di Dio, a offrire i vostri corpi come sacrificio vivente.”</p><cite>Romani 12:1</cite></blockquote></header>
    <div class="pastor-profiles">${pastors.map(pastorProfile).join('')}</div>
  </div></section>`;
}

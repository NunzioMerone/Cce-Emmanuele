import { pastors } from '../config/pastors.mjs';
import { aboutCopy } from '../config/about.mjs';
import { escapeHtml } from '../utils/html.mjs';

/** @param {typeof pastors[number]} pastor */
export function pastorProfile(pastor) {
  return `<article class="pastor-profile" data-reveal>
    <div class="pastor-profile-photo"><img src="${escapeHtml(pastor.photo)}" alt="${escapeHtml(pastor.name)}, pastore della Chiesa Emmanuele" width="1122" height="1402" loading="lazy" decoding="async"></div>
    <div class="pastor-profile-copy"><h3>${escapeHtml(pastor.name)}</h3><p class="eyebrow">Pastore</p><p>${escapeHtml(aboutCopy.short)}</p></div>
  </article>`;
}

export function aboutPastors() {
  return `<section class="about-pastors about-section" id="pastori" aria-labelledby="pastors-title"><div class="container">
    <header class="about-section-heading" data-reveal><p class="eyebrow">Una guida nel cammino</p><h2 id="pastors-title">Una guida nel <em>cammino.</em></h2></header>
    <div class="pastor-profiles">${pastors.map(pastorProfile).join('')}</div>
  </div></section>`;
}

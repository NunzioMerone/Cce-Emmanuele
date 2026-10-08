import { churchTimeline } from '../config/about.mjs';
import { communityPhoto } from './community-photo.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';
import { carousel } from './carousel.mjs';

/** @param {typeof churchTimeline[number]} item @param {number} index */
function storyPanel(item, index) {
  const caption = item.photo.caption || item.photo.alt;
  const credit = item.photo.source
    ? `<a href="${escapeHtml(item.photo.source)}" target="_blank" rel="noopener noreferrer">${escapeHtml(caption)}${item.photo.author ? ` · ${escapeHtml(item.photo.author)}` : ''}</a>`
    : escapeHtml(caption);
  return `<article class="about-story-panel" id="story-panel-${index + 1}" data-story-panel aria-labelledby="story-heading-${index + 1}">
    <figure class="about-story-photo${index === 0 ? ' about-story-photo--historic' : ''}">
      <div class="about-story-photo-frame">${communityPhoto(item.photo)}</div><figcaption>${credit}</figcaption>
    </figure>
    <div class="about-story-copy">
      <header class="about-story-copy-heading"><p class="about-story-date">${escapeHtml(item.label)}</p><h3 id="story-heading-${index + 1}">${escapeHtml(item.title)}</h3></header>
      <div class="about-story-prose">${item.description.split('\n\n').map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
    </div>
  </article>`;
}

export function aboutStory() {
  return `<section class="about-story-section about-section" id="storia" data-story aria-labelledby="story-title"><div class="container">
    <header class="about-section-heading about-section-heading--split" data-reveal>
      <div><p class="eyebrow">Le nostre radici</p><h2 id="story-title">La nostra storia a <em>Bacoli.</em></h2></div>
      <blockquote class="about-section-quote"><p>“Fino a qui ci ha aiutati il Signore.”</p><cite>1 Samuele 7:12</cite></blockquote>
    </header>
    <div class="about-story-navigation" data-story-navigation data-reveal="fade">
      <p class="about-story-hint">${icon('arrow')}<span>Scorri o tocca una tappa per scoprire la storia.</span></p>
      <div class="about-story-line" aria-hidden="true"><span></span></div>
      <ol class="about-story-steps" data-story-steps aria-label="Tappe della storia della Chiesa Emmanuele">${churchTimeline.map((item, index) => `<li>
        <a class="about-story-step" id="story-tab-${index + 1}" href="#story-panel-${index + 1}" aria-label="${escapeHtml(`${item.label} — ${item.title}`)}" data-story-tab><span class="about-story-step-dot" aria-hidden="true"></span><span class="about-story-step-label"><strong><span class="about-story-date-full">${escapeHtml(item.label)}</span><span class="about-story-date-short" aria-hidden="true">${escapeHtml(index < 2 ? ['’70', '’80'][index] : item.label)}</span></strong><span>${escapeHtml(item.title)}</span></span>${icon('chevron', 'about-story-step-arrow')}</a>
      </li>`).join('')}</ol>
    </div>
    <div class="about-story-panels" data-reveal="fade">${carousel({ id: 'story-carousel', label: 'La nostra storia a Bacoli', items: churchTimeline.map(storyPanel), maxVisible: 1, trackClassName: 'about-story-track' })}</div>
  </div></section>`;
}

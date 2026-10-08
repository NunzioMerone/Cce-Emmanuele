import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

export function readingBackLink() {
  return `<a class="reading-back-link" href="chi-siamo.html" aria-label="Indietro a Chi siamo">${icon('arrow', 'reading-back-arrow')}<span>Indietro</span></a>`;
}

/** @param {import('../domain/reading.mjs').ReadingDocument} content */
export function readingOpening(content) {
  return `<header class="reading-opening"><div class="container reading-container">
    ${readingBackLink()}
    <p class="eyebrow">Chiesa Cristiana Evangelica Emmanuele</p><h1>${escapeHtml(content.title)}</h1>
  </div></header>`;
}

/** @param {import('../domain/reading.mjs').ReadingGroup[]} groups */
function indexLinks(groups) {
  return `<ol class="reading-toc-groups">${groups.map(group => `<li><a class="reading-toc-group" href="#${escapeHtml(group.id)}"><span>${escapeHtml(group.number || '')}</span>${escapeHtml(group.title)}</a>
    ${group.topics?.length ? `<ol>${group.topics.map(topic => `<li><a href="#${escapeHtml(topic.id)}"><span>${escapeHtml(topic.number || '')}</span>${escapeHtml(topic.title)}</a></li>`).join('')}</ol>` : ''}</li>`).join('')}</ol>`;
}

/** @param {import('../domain/reading.mjs').ReadingGroup[]} groups */
export function readingIndex(groups) {
  const links = indexLinks(groups);
  return `<aside class="reading-sidebar">
    <nav class="reading-index-desktop" aria-label="Indice dei contenuti"><p class="reading-index-label">In questa pagina</p>${links}</nav>
    <details class="reading-index-mobile"><summary>Indice dei contenuti${icon('chevron')}</summary><nav aria-label="Indice dei contenuti">${links}</nav></details>
  </aside>`;
}

/** @param {string} text @param {import('../domain/reading.mjs').NoteAnchor[]} [notes] */
function annotatedText(text, notes = []) {
  let start = 0;
  let html = '';
  for (const note of notes) {
    html += escapeHtml(text.slice(start, note.offset));
    html += `<sup class="reading-note-reference" id="nota-rimando-${escapeHtml(note.id)}"><a href="#nota-${escapeHtml(note.id)}" aria-label="Leggi la nota ${escapeHtml(note.id)}">${escapeHtml(note.id)}</a></sup>`;
    start = note.offset;
  }
  return html + escapeHtml(text.slice(start));
}

/** @param {import('../domain/reading.mjs').ReadingBlock[]} blocks */
export function readingBlocks(blocks) {
  return blocks.map(block => {
    if (block.type === 'list') return `<ol class="reading-principles">${block.items.map(text => `<li>${escapeHtml(text)}</li>`).join('')}</ol>`;
    if (block.type === 'scripture') return `<blockquote class="reading-scripture"><cite>${escapeHtml(block.reference)}</cite><p>${escapeHtml(block.text)}</p></blockquote>`;
    const text = annotatedText(block.text, block.notes);
    if (block.type === 'quote') return `<blockquote class="reading-quotation"><p>${text}</p></blockquote>`;
    return `<p${block.type === 'references' ? ' class="reading-bible-references"' : ''}>${text}</p>`;
  }).join('');
}

/** @param {import('../domain/reading.mjs').Footnote[]} notes */
function readingFootnotes(notes) {
  return `<aside class="reading-footnotes" aria-label="Note bibliografiche"><p class="reading-footnotes-label">Note</p><ol>${notes.map(note => `<li id="nota-${escapeHtml(note.id)}" value="${escapeHtml(note.id)}">${escapeHtml(note.text)} <a href="#nota-rimando-${escapeHtml(note.id)}" aria-label="Torna al richiamo della nota ${escapeHtml(note.id)}">↩</a></li>`).join('')}</ol></aside>`;
}

/** @param {import('../domain/reading.mjs').ReadingTopic} topic @param {number} [level] */
function readingTopic(topic, level = 3) {
  return `<section class="reading-topic" id="${escapeHtml(topic.id)}" aria-labelledby="${escapeHtml(topic.id)}-titolo"><h${level} id="${escapeHtml(topic.id)}-titolo">${topic.number ? `<span class="reading-number">${escapeHtml(topic.number)}.</span>` : ''}<span>${escapeHtml(topic.title)}${topic.separator ? ` <span class="reading-title-separator">${escapeHtml(topic.separator)}</span>` : ''}</span></h${level}>
    ${readingBlocks(topic.blocks)}${topic.topics?.map(child => readingTopic(child, level + 1)).join('') || ''}${topic.footnotes ? readingFootnotes(topic.footnotes) : ''}
  </section>`;
}

/** @param {import('../domain/reading.mjs').ReadingGroup} group */
export function readingGroup(group) {
  return `<section class="reading-group${group.variant ? ` reading-group--${escapeHtml(group.variant)}` : ''}" id="${escapeHtml(group.id)}" aria-labelledby="${escapeHtml(group.id)}-titolo">
    <h2 id="${escapeHtml(group.id)}-titolo"><span class="reading-number">${escapeHtml(group.number || '')}.</span><span>${escapeHtml(group.title)}</span></h2>
    <div class="reading-group-intro">${readingBlocks(group.blocks)}</div>${group.topics?.map(topic => readingTopic(topic)).join('') || ''}
  </section>`;
}

/** @param {{href:string, label:string}} other */
export function readingRelated(other) {
  return `<nav class="reading-related" aria-label="Altri approfondimenti"><a href="chi-siamo.html">${icon('arrow', 'reading-back-arrow')}Torna a Chi siamo</a><a href="${escapeHtml(other.href)}">${escapeHtml(other.label)}${icon('arrow')}</a></nav>`;
}

import { identityContent } from '../config/identity.mjs';
import { readingOpening, readingIndex, readingGroup, readingRelated } from '../components/reading-document.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { icon } from '../components/icon.mjs';

export function identityPage() {
  return `<div class="reading-page reading-page--identity">${readingOpening(identityContent)}
    <div class="container reading-container reading-layout">${readingIndex(identityContent.groups)}<article class="reading-content" aria-label="Identità e vita comunitaria">${identityContent.groups.map(readingGroup).join('')}
      <aside class="reading-source" aria-label="Pieghevole originale e attribuzioni"><a class="reading-pdf-link" href="${escapeHtml(identityContent.pdf)}">${icon('book')}Apri il pieghevole originale — PDF${icon('arrow')}</a><div class="reading-source-credits">${identityContent.credits.map(text => `<p>${escapeHtml(text)}</p>`).join('')}</div></aside>
      ${readingRelated({ href: 'la-nostra-fede.html', label: 'La nostra fede' })}</article></div>
  </div>`;
}

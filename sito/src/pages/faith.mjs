import { faithContent } from '../config/faith.mjs';
import { readingOpening, readingIndex, readingGroup, readingRelated } from '../components/reading-document.mjs';

export function faithPage() {
  return `<div class="reading-page reading-page--faith">${readingOpening(faithContent)}
    <div class="container reading-container reading-layout">${readingIndex(faithContent.groups)}<article class="reading-content" aria-label="Dichiarazione di fede">${faithContent.groups.map(readingGroup).join('')}${readingRelated({ href: 'identita-vita-comunitaria.html', label: 'Identità e vita comunitaria' })}</article></div>
  </div>`;
}

import { icon } from './icon.mjs';
import { button } from './button.mjs';
import { selectMenu } from './select-menu.mjs';

export function catalogToolbar({ searchId = 'catalog-search', sortId = 'catalog-sort', series = false } = {}) {
  return `<div class="archive-toolbar">
    <form class="catalog-search" role="search">
      <label class="visually-hidden" for="${searchId}">${series ? 'Cerca nella serie' : 'Cerca un messaggio per titolo'}</label>
      ${icon('search')}
      <input type="search" id="${searchId}" placeholder="${series ? 'Cerca un messaggio nella serie…' : 'Cerca una parola, un titolo…'}" autocomplete="off">
    </form>
    ${selectMenu({ id: sortId, label: 'Ordina per', value: 'newest', className: 'catalog-sort', options: [{ value: 'newest', label: 'Più recenti' }, { value: 'oldest', label: 'Meno recenti' }] })}
    ${button({ label: 'Filtra', variant: 'icon-label', iconName: 'filter', iconPosition: 'start', className: 'filter-trigger', attributes: { id: 'open-sermon-filters', 'aria-label': 'Filtra i messaggi', 'aria-haspopup': 'dialog', 'aria-controls': 'sermon-filter-dialog' }, suffix: '<span id="filter-count" class="filter-count" hidden>0</span>' })}
  </div>`;
}

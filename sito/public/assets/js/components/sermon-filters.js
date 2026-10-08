import { initializeSelectMenu } from './select-menu.js';
import { matchingVideos, normalize } from '../domain/sermons.mjs';
import { monthLabel } from '../utils/dates.mjs';
import { durationOption, playlistOption, monthOption, yearOptions } from './filter-options.mjs';

/** Shared modal; its collection determines the available filters and preview count.
 * @param {{getCollection:()=>ReturnType<import('../domain/sermons.mjs').archive>|null,
 * getFilters:()=>import('../domain/sermons.mjs').Filters,
 * onApply:(filters:import('../domain/sermons.mjs').Filters)=>void}} options */
export function initializeSermonFilters({ getCollection, getFilters, onApply }) {
  const get = id => document.getElementById(id);
  const dialog = get('sermon-filter-dialog');
  const form = get('sermon-filter-form');
  if (!dialog || !form) return;
  const from = get('filter-date-from');
  const to = get('filter-date-to');
  const playlistSearch = get('playlist-filter-search');
  const monthYear = get('filter-month-year');
  const yearMenu = initializeSelectMenu(monthYear.closest('[data-select-menu]'));
  function draftFilters() {
    return { ...getFilters(),
      playlists: [...form.querySelectorAll('input[name="playlist"]:checked')].map(input => input.value),
      months: [...form.querySelectorAll('input[name="month"]:checked')].map(input => input.value), from: from.value, to: to.value,
      year: monthYear.value,
      durations: [...form.querySelectorAll('input[name="duration"]:checked')].map(input => input.value),
    };
  }

  function renderPreview() {
    const collection = getCollection();
    const draft = draftFilters();
    const invalid = Boolean(draft.from && draft.to && draft.from > draft.to);
    get('filter-validation').hidden = !invalid;
    get('filter-validation').textContent = invalid ? 'La data iniziale deve precedere o coincidere con quella finale.' : '';
    const count = collection ? matchingVideos(collection, draft).length : 0;
    get('filter-preview').textContent = collection ? `${count} ${count === 1 ? 'messaggio corrispondente' : 'messaggi corrispondenti'}` : 'La raccolta non è ancora disponibile';
    form.querySelector('[type="submit"]').disabled = !collection || invalid;
    const counts = { duration: draft.durations.length, playlist: draft.playlists.length, period: Number(Boolean(draft.year)) + draft.months.length + Number(Boolean(draft.from)) + Number(Boolean(draft.to)) };
    form.querySelectorAll('[data-tab-count]').forEach(badge => {
      const count = counts[badge.dataset.tabCount];
      badge.textContent = String(count);
      badge.hidden = !count;
    });
    get('selected-months-note').textContent = draft.months.length ? `${draft.months.length} ${draft.months.length === 1 ? 'mese selezionato' : 'mesi selezionati'}` : '';
    return !invalid;
  }

  function showFilterTab(name, focus = false) {
    form.querySelectorAll('[data-filter-tab]').forEach(tab => {
      const selected = tab.dataset.filterTab === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      get(`panel-${tab.dataset.filterTab}`).hidden = !selected;
      if (selected && focus) tab.focus();
    });
    document.querySelector('.filter-dialog-content').scrollTop = 0;
  }

  function showMonthYear() {
    get('month-filter-options').querySelectorAll('label').forEach(label => {
      const input = label.querySelector('input');
      label.hidden = monthYear.value ? label.dataset.year !== monthYear.value : !input.checked;
      label.querySelector('span').textContent = monthYear.value ? monthLabel(input.value).replace(/ \d{4}$/, '') : monthLabel(input.value);
    });
    get('month-year-placeholder').hidden = Boolean(monthYear.value);
  }

  function filterPlaylists() {
    if (!playlistSearch) return;
    const terms = normalize(playlistSearch.value).trim().split(/\s+/).filter(Boolean);
    const options = [...get('playlist-filter-options').querySelectorAll('label')];
    options.forEach(label => { label.hidden = !terms.every(term => normalize(label.dataset.playlistTitle).includes(term)); });
    get('playlist-filter-empty').hidden = !options.length || options.some(label => !label.hidden);
  }

  function prepareDialog() {
    const collection = getCollection();
    const filters = getFilters();
    if (collection) {
      get('duration-filter-options').innerHTML = collection.durations.length ? collection.durations.map(range => durationOption(range, filters.durations)).join('') : '<p class="filter-placeholder">Non sono ancora disponibili durate per i messaggi.</p>';
      if (playlistSearch) get('playlist-filter-options').innerHTML = collection.playlists.length ? collection.playlists.map(playlist => playlistOption(playlist, filters.playlists)).join('') : '<p class="filter-placeholder">Non sono ancora presenti playlist.</p>';
      const monthYears = [...new Set(filters.months.map(month => month.slice(0, 4)))];
      const selectedYear = filters.year || (monthYears.length === 1 ? monthYears[0] : '');
      monthYear.innerHTML = yearOptions(collection.years, selectedYear);
      monthYear.disabled = !collection.years.length;
      yearMenu?.refresh();
      get('month-filter-options').innerHTML = collection.months.length ? collection.months.map(month => monthOption(month, filters.months)).join('') : '<p class="filter-placeholder">Non sono ancora presenti messaggi.</p>';
      showMonthYear();
      for (const field of [from, to]) { field.min = collection.minDate; field.max = collection.maxDate; }
    }
    from.value = filters.from;
    to.value = filters.to;
    from.disabled = to.disabled = !collection;
    if (playlistSearch) { playlistSearch.value = ''; filterPlaylists(); }
    showFilterTab('duration');
    renderPreview();
  }

  const tabs = [...form.querySelectorAll('[data-filter-tab]')];
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => showFilterTab(tab.dataset.filterTab));
    tab.addEventListener('keydown', event => {
      const next = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      showFilterTab(tabs[next].dataset.filterTab, true);
    });
  });
  playlistSearch?.addEventListener('input', filterPlaylists);
  playlistSearch?.addEventListener('keydown', event => { if (event.key === 'Enter') event.preventDefault(); });
  monthYear.addEventListener('change', () => {
    form.querySelectorAll('input[name="month"]').forEach(input => { input.checked = false; });
    showMonthYear();
  });

  function closeDialog() { dialog.close(); }
  get('open-sermon-filters').addEventListener('click', () => {
    prepareDialog();
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
  });
  get('close-sermon-filters').addEventListener('click', closeDialog);
  dialog.addEventListener('close', () => {
    yearMenu?.close();
    document.documentElement.classList.remove('dialog-open');
    get('open-sermon-filters').focus();
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
  });
  form.addEventListener('change', renderPreview);
  // Native validation must reveal date fields even when another tab is selected.
  form.addEventListener('invalid', () => showFilterTab('period'), true);
  get('reset-filter-draft').addEventListener('click', () => {
    form.querySelectorAll('input[type="checkbox"]').forEach(input => { input.checked = false; });
    from.value = to.value = '';
    monthYear.value = '';
    yearMenu?.refresh();
    showMonthYear();
    if (playlistSearch) { playlistSearch.value = ''; filterPlaylists(); }
    renderPreview();
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!getCollection() || !renderPreview()) return;
    onApply(draftFilters());
    closeDialog();
  });

}

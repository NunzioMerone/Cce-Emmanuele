import { sermonSkeletonGrid, catalogFeedback } from '../components/sermon-loading.mjs';
import { archive, filtersFromUrl, filtersToUrl, matchingVideos, playlistArchive, OTHER_PLAYLIST, emptyFilters } from '../domain/sermons.mjs';
import { fetchSermonCatalog } from '../services/sermon-catalog.mjs';
import { seriesMore, seriesResults } from '../components/series-results.mjs';
import { sermonCard } from '../components/sermon-card.mjs';
import { visibleItems } from '../utils/pagination.mjs';
import { external } from '../components/text-link.mjs';
import { initializeSelectMenu } from '../components/select-menu.js';
import { initializeSermonFilters } from '../components/sermon-filters.js';
import { renderSermonFilterChips } from '../components/sermon-filter-chips.js';
import { sermonUi } from '../config/ui.mjs';

const app = document.querySelector('[data-series-app]');
if (app) initialize();

function initialize() {
  const get = id => document.getElementById(id);
  const videos = get('series-videos');
  const search = get('series-search');
  const sort = get('series-sort');
  const notice = get('series-notice');
  const params = new URLSearchParams(location.search);
  const id = params.get('playlist') || '';
  // Playlist identifies the page; it is never an optional filter in this view.
  let filters = { ...filtersFromUrl(location.search), playlists: [] };
  let visible = sermonUi.seriesBatchSize;
  search.value = filters.query;
  sort.value = filters.sort;
  const sortMenu = initializeSelectMenu(sort.closest('[data-select-menu]'));
  /** @type {ReturnType<typeof archive>|null} */
  let collection = null;
  let updatedAt = '';
  let fetching = false;

  function updateUrl() {
    const query = new URLSearchParams(filtersToUrl(filters));
    query.set('playlist', id);
    history.replaceState(null, '', `${location.pathname}?${query}${location.hash}`);
  }

  function render() {
    videos.setAttribute('aria-busy', 'false');
    app.querySelector('[data-series-toolbar]').hidden = !collection;
    if (!collection) {
      get('series-title').textContent = 'Serie non disponibile.';
      document.title = 'Serie non disponibile · Chiesa Emmanuele';
      get('series-description').textContent = 'Questa raccolta non è presente nel catalogo attuale. Puoi esplorare le altre serie nella pagina Prediche.';
      get('series-youtube').innerHTML = '';
      videos.innerHTML = '';
      return;
    }
    const group = collection.playlists[0];
    get('series-title').textContent = group.title;
    document.title = `${group.title} · Prediche · Chiesa Emmanuele`;
    get('series-description').textContent = 'Tutti i messaggi di questa raccolta, da ascoltare nel tuo cammino.';
    get('series-youtube').innerHTML = group.id === OTHER_PLAYLIST ? '' : external(`https://www.youtube.com/playlist?list=${encodeURIComponent(group.id)}`, 'Playlist su YouTube');
    const matched = matchingVideos(collection, filters);
    const results = seriesResults({ videos: matched, visible });
    const total = collection.videos.length;
    get('series-count').textContent = matched.length === total
      ? `${total} ${total === 1 ? 'messaggio nella serie' : 'messaggi nella serie'}`
      : `${matched.length} ${matched.length === 1 ? 'messaggio trovato' : 'messaggi trovati'} su ${total}`;
    videos.innerHTML = results.markup;
    renderSermonFilterChips(collection, filters);
    updateUrl();
  }

  function applyFilters(next) { filters = next; visible = sermonUi.seriesBatchSize; render(); }
  initializeSermonFilters({ getCollection: () => collection, getFilters: () => filters, onApply: applyFilters });
  search.closest('form').addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', () => applyFilters({ ...filters, query: search.value }));
  sort.addEventListener('change', () => applyFilters({ ...filters, sort: sort.value }));
  get('clear-sermon-filters').addEventListener('click', () => {
    search.value = '';
    sort.value = 'newest';
    sortMenu?.refresh();
    applyFilters(emptyFilters());
  });
  get('active-sermon-filters').addEventListener('click', event => {
    const chip = event.target instanceof Element ? event.target.closest('[data-remove-filter]') : null;
    if (!chip) return;
    const kind = chip.dataset.removeFilter;
    if (kind === 'months' || kind === 'durations') applyFilters({ ...filters, [kind]: filters[kind].filter(value => value !== chip.dataset.value) });
    else if (kind === 'from' || kind === 'to' || kind === 'year') applyFilters({ ...filters, [kind]: '' });
  });
  videos.addEventListener('click', event => {
    const action = event.target instanceof Element ? event.target.closest('[data-series-more]') : null;
    if (!action || !collection) return;
    const matched = matchingVideos(collection, filters);
    const previousCount = Math.min(visible, matched.length);
    visible += sermonUi.seriesBatchSize;
    const results = visibleItems(matched, visible, sermonUi.seriesBatchSize);
    const grid = get('series-grid');
    // Append only new cards: existing videos keep their nodes and interaction state.
    grid.insertAdjacentHTML('beforeend', results.items.slice(previousCount).map(video => sermonCard(video, false, { headingLevel: 'h3' })).join(''));
    videos.querySelector('.series-more')?.remove();
    videos.insertAdjacentHTML('beforeend', seriesMore(results));
    // Move keyboard focus to the first added message without jumping the page.
    const firstAdded = grid.children[previousCount]?.querySelector('.video-load, .video-external');
    firstAdded?.focus({ preventScroll: true });
    get('series-count').textContent = `${results.count} di ${matched.length} ${matched.length === 1 ? 'messaggio' : 'messaggi'}${matched.length !== collection.videos.length ? ` trovati su ${collection.videos.length}` : ' nella serie'}`;
  });

  async function load() {
    if (fetching || (collection && document.querySelector('#sermon-video-dialog[open], #sermon-filter-dialog[open]'))) return;
    fetching = true;
    if (!collection) {
      notice.hidden = true;
      videos.innerHTML = sermonSkeletonGrid();
      videos.setAttribute('aria-busy', 'true');
      get('series-count').textContent = 'Caricamento dei messaggi…';
    }
    try {
      const data = await fetchSermonCatalog();
      notice.hidden = data.status !== 'stale';
      notice.textContent = data.status === 'stale' ? 'Stai vedendo l’ultima raccolta disponibile, in attesa di un nuovo aggiornamento.' : '';
      if (collection && data.updatedAt === updatedAt) return;
      collection = playlistArchive(archive(data), id);
      if (collection) {
        if (!collection.years.includes(filters.year)) filters.year = '';
        filters.months = filters.months.filter(month => collection.months.includes(month));
        filters.durations = filters.durations.filter(range => collection.durations.some(item => item.id === range));
      }
      render();
      updatedAt = data.updatedAt;
    } catch {
      notice.hidden = false;
      notice.innerHTML = catalogFeedback('Non siamo riusciti a caricare la serie. Riprova oppure torna alla pagina Prediche.');
      if (!collection) { videos.innerHTML = ''; videos.setAttribute('aria-busy', 'false'); get('series-count').textContent = ''; }
    } finally { fetching = false; }
  }
  app.addEventListener('click', event => { if (event.target instanceof Element && event.target.closest('[data-load-retry]')) load(); });
  if (location.protocol === 'file:') {
    notice.hidden = false;
    notice.textContent = 'Per visualizzare la serie usa il sito online o l’anteprima locale.';
    videos.innerHTML = '';
    videos.setAttribute('aria-busy', 'false');
    get('series-count').textContent = '';
  } else {
    load();
    setInterval(() => { if (!document.hidden) load(); }, sermonUi.refreshIntervalMs);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
  }
}

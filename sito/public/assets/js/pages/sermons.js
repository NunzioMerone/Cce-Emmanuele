import { sermonSkeleton, sermonSkeletonGrid, catalogFeedback } from '../components/sermon-loading.mjs';
import { archive, matchingVideos, groupedVideos, emptyFilters, filtersFromUrl, filtersToUrl } from '../domain/sermons.mjs';
import { playlistSection } from '../components/playlist-section.mjs';
import { catalogEmpty } from '../components/catalog-empty.mjs';
import { renderSermonFilterChips } from '../components/sermon-filter-chips.js';
import { initializeSermonFilters } from '../components/sermon-filters.js';
import { sermonUi } from '../config/ui.mjs';
import { sermonCard as videoMarkup } from '../components/sermon-card.mjs';
import { fetchSermonCatalog } from '../services/sermon-catalog.mjs';
import { initializeCarousel } from '../components/carousel.js';
import { initializeSelectMenu } from '../components/select-menu.js';

const app = document.querySelector('[data-sermons-app]');
if (app) initialize();

function initialize() {
  const get = id => document.getElementById(id);
  const dialog = get('sermon-filter-dialog');
  const sections = get('playlist-sections');
  const search = get('catalog-search');
  const sort = get('catalog-sort');
  const channelUrl = app.dataset.channelUrl;
  let collection = null;
  let filters = filtersFromUrl(location.search);
  let updatedAt = '';
  let fetching = false;
  /** @type {import('../components/carousel.js').CarouselController[]} */
  let carousels = [];
  search.value = filters.query;
  sort.value = filters.sort;
  const sortMenu = initializeSelectMenu(sort.closest('[data-select-menu]'));

  function updateUrl() {
    const query = filtersToUrl(filters);
    history.replaceState(null, '', `${location.pathname}${query ? `?${query}` : ''}${location.hash}`);
  }

  function renderArchive() {
    if (!collection) return;
    const groups = groupedVideos(collection, filters);
    const matched = matchingVideos(collection, filters);
    get('catalog-count').textContent = `${matched.length} ${matched.length === 1 ? 'messaggio' : 'messaggi'} · ${groups.length} ${groups.length === 1 ? 'raccolta' : 'raccolte'}`;
    // Dispose observers and global drag listeners before replacing the series.
    carousels.forEach(controller => controller.destroy());
    carousels = [];
    sections.innerHTML = groups.length
      ? groups.map((group, index) => playlistSection(group, index)).join('')
      : catalogEmpty(Boolean(collection.videos.length), channelUrl);
    sections.setAttribute('aria-busy', 'false');
    sections.querySelectorAll('[data-carousel]').forEach(root => {
      if (!(root instanceof HTMLElement)) return;
      const controller = initializeCarousel(root);
      if (controller) carousels.push(controller);
    });
    renderSermonFilterChips(collection, filters);
    updateUrl();
  }

  initializeSermonFilters({
    getCollection: () => collection,
    getFilters: () => filters,
    onApply: next => { filters = next; renderArchive(); },
  });

  function resetFilters() {
    filters = emptyFilters();
    search.value = '';
    sort.value = 'newest';
    sortMenu?.refresh();
    renderArchive();
  }
  get('clear-sermon-filters').addEventListener('click', resetFilters);
  get('active-sermon-filters').addEventListener('click', event => {
    const chip = event.target instanceof Element ? event.target.closest('[data-remove-filter]') : null;
    if (!chip) return;
    const kind = chip.dataset.removeFilter;
    if (kind === 'playlists' || kind === 'months' || kind === 'durations') filters[kind] = filters[kind].filter(value => value !== chip.dataset.value);
    else if (kind === 'from' || kind === 'to' || kind === 'year') filters[kind] = '';
    renderArchive();
  });
  document.querySelector('.catalog-search').addEventListener('submit', event => event.preventDefault());
  search.addEventListener('input', () => { filters.query = search.value; renderArchive(); });
  sort.addEventListener('change', () => { filters.sort = sort.value; renderArchive(); });
  sections.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target.closest('button') : null;
    if (target?.hasAttribute('data-reset-all')) resetFilters();
  });


  async function loadCatalog() {
    if (fetching || (collection && (dialog.open || document.querySelector('#sermon-video-dialog[open]')))) return;
    fetching = true;
    if (!collection) {
      get('catalog-notice').hidden = true;
      get('latest-sermon').innerHTML = sermonSkeleton(true);
      get('latest-sermon').setAttribute('aria-busy', 'true');
      sections.innerHTML = sermonSkeletonGrid();
      sections.setAttribute('aria-busy', 'true');
      get('catalog-count').textContent = 'Caricamento della raccolta…';
    }
    try {
      const data = await fetchSermonCatalog();
      const notice = get('catalog-notice');
      notice.hidden = data.status !== 'stale';
      notice.textContent = data.status === 'stale' ? 'Stai vedendo l’ultima raccolta disponibile, in attesa di un nuovo aggiornamento.' : '';
      if (collection && updatedAt === data.updatedAt) return;
      collection = archive(data);
      filters.playlists = filters.playlists.filter(id => collection.playlists.some(playlist => playlist.id === id));
      filters.months = filters.months.filter(month => collection.months.includes(month));
      if (!collection.years.includes(filters.year)) filters.year = '';
      filters.durations = filters.durations.filter(id => collection.durations.some(range => range.id === id));
      if (collection.latest) {
        get('latest-sermon').innerHTML = videoMarkup(collection.latest, true);
        get('latest-sermon-label').innerHTML = '<span class="gold-line"></span>L’ultimo messaggio';
      } else {
        get('latest-sermon').innerHTML = `<div class="catalog-state">${catalogFeedback('Non ci sono ancora messaggi disponibili.', { retry: false, url: channelUrl })}</div>`;
      }
      get('latest-sermon').setAttribute('aria-busy', 'false');
      renderArchive();
      updatedAt = data.updatedAt;
    } catch (error) {
      const notice = get('catalog-notice');
      notice.hidden = false;
      notice.innerHTML = catalogFeedback(error.message === 'not_configured' ? 'La raccolta delle prediche è in fase di collegamento.' : 'Non siamo riusciti a caricare le prediche. Riprova oppure visita il canale YouTube.', { url: channelUrl });
      if (!collection) {
        get('latest-sermon').innerHTML = `<div class="catalog-state">${catalogFeedback('L’ultimo messaggio non è temporaneamente disponibile.', { retry: false })}</div>`;
        get('latest-sermon').setAttribute('aria-busy', 'false');
        sections.innerHTML = '';
        sections.setAttribute('aria-busy', 'false');
        get('catalog-count').textContent = 'I messaggi della Chiesa Emmanuele';
      }
    } finally { fetching = false; }
  }
  app.addEventListener('click', event => { if (event.target instanceof Element && event.target.closest('[data-load-retry]')) loadCatalog(); });
  if (location.protocol === 'file:') {
    get('latest-sermon').innerHTML = `<div class="catalog-state">${catalogFeedback('Apri l’anteprima locale per caricare le prediche.', { retry: false, url: channelUrl })}</div>`;
    get('latest-sermon').setAttribute('aria-busy', 'false');
    get('catalog-notice').hidden = false;
    get('catalog-notice').textContent = 'Per caricare la raccolta usa il sito online o l’anteprima locale. Puoi sempre visitare il nostro canale YouTube.';
    sections.innerHTML = '';
    sections.setAttribute('aria-busy', 'false');
    get('catalog-count').textContent = 'I messaggi della Chiesa Emmanuele';
  } else {
    loadCatalog();
    setInterval(() => { if (!document.hidden) loadCatalog(); }, sermonUi.refreshIntervalMs);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) loadCatalog(); });
  }
}

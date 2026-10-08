import { sermonSkeleton, catalogFeedback } from '../components/sermon-loading.mjs';
import { fetchSermonCatalog } from '../services/sermon-catalog.mjs';
import { latestVideos } from '../domain/sermons.mjs';
import { sermonCard } from '../components/sermon-card.mjs';
import { homeUi, sermonUi } from '../config/ui.mjs';

const section = document.querySelector('[data-home-sermons]');
if (section instanceof HTMLElement) initializeSermonPreview(section);

/** @param {HTMLElement} element */
function initializeSermonPreview(element) {
  const grid = element.querySelector('[data-preview-videos]');
  const status = element.querySelector('[data-preview-status]');
  if (!(grid instanceof HTMLElement) || !(status instanceof HTMLElement)) return;
  let loading = false;
  let loaded = false;
  let signature = '';

  /** @param {boolean} visible */
  function showVideos(visible) {
    grid.hidden = !visible;
    const carousel = grid.closest('[data-carousel]');
    if (carousel instanceof HTMLElement) carousel.hidden = !visible;
  }

  /** @param {string} message */
  function showStatus(message, retry = false) {
    status.innerHTML = message ? catalogFeedback(message, { retry }) : '';
    status.hidden = !message;
  }


  async function refresh() {
    if (loading || document.hidden || document.querySelector('#sermon-video-dialog[open]')) return;
    loading = true;
    if (!loaded) {
      grid.innerHTML = Array.from({ length: homeUi.sermonPreviewLimit }, () => sermonSkeleton()).join('');
      grid.setAttribute('aria-busy', 'true');
      showVideos(true);
      showStatus('Caricamento degli ultimi messaggi…');
    }
    try {
      const catalog = await fetchSermonCatalog();
      const videos = latestVideos(catalog.videos, homeUi.sermonPreviewLimit);
      const nextSignature = JSON.stringify(videos);
      // Do not replace the card that opened the player during an in-flight refresh.
      if (document.querySelector('#sermon-video-dialog[open]')) return;
      if (signature !== nextSignature) {
        grid.innerHTML = videos.map(video => sermonCard(video, false, { headingLevel: 'h3' })).join('');
        showVideos(!!videos.length);
        signature = nextSignature;
      }
      loaded = true;
      showStatus(!videos.length ? 'I nuovi messaggi saranno disponibili qui appena pubblicati.'
        : catalog.status === 'stale' ? 'Stai vedendo gli ultimi messaggi disponibili, in attesa di un nuovo aggiornamento.' : '');
    } catch {
      if (!loaded) { grid.replaceChildren(); showVideos(false); }
      showStatus('Non siamo riusciti a caricare gli ultimi messaggi. Riprova oppure apri la pagina Prediche.', true);
    } finally {
      loading = false;
      grid.setAttribute('aria-busy', 'false');
    }
  }

  element.addEventListener('click', event => { if (event.target instanceof Element && event.target.closest('[data-load-retry]')) refresh(); });
  if (location.protocol === 'file:') {
    grid.replaceChildren();
    showVideos(false);
    grid.setAttribute('aria-busy', 'false');
    showStatus('Per caricare gli ultimi messaggi apri l’anteprima locale o il sito online.');
    return;
  }
  refresh();
  setInterval(() => { if (!document.hidden) refresh(); }, sermonUi.refreshIntervalMs);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
}

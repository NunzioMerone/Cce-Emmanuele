/** @typedef {import('../server/youtube.mjs').Catalog & {status:'ready'|'stale'}} CatalogResponse */

class CatalogRequestError extends Error {
  constructor(message, retryable = false) { super(message); this.retryable = retryable; }
}

const wait = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

function catalogEndpoint() {
  return typeof document !== 'undefined'
    ? document.querySelector('meta[name="sermon-catalog-url"]')?.content || '/api/sermons'
    : '/api/sermons';
}

/** Fetch the server endpoint or the public snapshot configured by the static build.
 * Credentials never reach the browser.
 * Network failures and temporary HTTP errors get two bounded automatic retries.
 * @param {{fetchImpl?:typeof fetch, waitImpl?:(ms:number)=>Promise<void>, timeoutMs?:number, endpoint?:string}} [options]
 * @returns {Promise<CatalogResponse>} */
export async function fetchSermonCatalog({ fetchImpl = fetch, waitImpl = wait, timeoutMs = 15000, endpoint = catalogEndpoint() } = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try { return await requestCatalog(fetchImpl, timeoutMs, endpoint); }
    catch (error) {
      if (!(error instanceof CatalogRequestError) || !error.retryable || attempt === 2) throw error;
      await waitImpl(attempt === 0 ? 500 : 1500);
    }
  }
  throw new Error('unavailable');
}

async function requestCatalog(fetchImpl, timeoutMs, endpoint) {
  let response;
  try {
    response = await fetchImpl(endpoint, { headers: { Accept: 'application/json' }, cache: 'no-store', signal: AbortSignal.timeout(timeoutMs) });
  } catch { throw new CatalogRequestError('unavailable', true); }
  let data;
  try { data = await response.json(); }
  catch { throw new CatalogRequestError('unavailable', response.status >= 500); }
  if (!response.ok || !['ready', 'stale'].includes(data?.status)) {
    const notConfigured = data?.status === 'not_configured';
    throw new CatalogRequestError(notConfigured ? 'not_configured' : 'unavailable', !notConfigured && (response.status >= 500 || response.status === 429));
  }
  if (!Array.isArray(data.videos) || !Array.isArray(data.playlists)
    || !Number.isFinite(Date.parse(data.updatedAt))
    || data.videos.some(video => !video || !/^[\w-]{11}$/.test(video.id)
      || typeof video.title !== 'string' || !Number.isFinite(Date.parse(video.publishedAt))
      || typeof video.thumbnail !== 'string' || typeof video.duration !== 'string'
      || typeof video.embeddable !== 'boolean')
    || data.playlists.some(playlist => !playlist || typeof playlist.id !== 'string'
      || typeof playlist.title !== 'string' || !Array.isArray(playlist.videoIds))) {
    throw new CatalogRequestError('unavailable');
  }
  return data;
}

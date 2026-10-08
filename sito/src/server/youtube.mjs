import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} title
 * @property {string} publishedAt
 * @property {string} thumbnail
 * @property {string} duration
 * @property {boolean} embeddable
 * @typedef {{id: string, title: string, description: string, videoIds: string[]}} Playlist
 * @typedef {{channelId: string, channelTitle: string, channelUrl: string, updatedAt: string, videos: Video[], playlists: Playlist[]}} Catalog
 */

export class CatalogError extends Error {
  /** @param {string} code @param {string} message */
  constructor(code, message) { super(message); this.code = code; }
}

/** Read-only YouTube adapter. Errors never include request URLs or credentials. */
export class YouTubeClient {
  /** @param {{key: string, channelId: string, fetchImpl?: typeof fetch}} options */
  constructor({ key, channelId, fetchImpl = fetch }) {
    this.key = key;
    this.channelId = channelId;
    this.fetch = fetchImpl;
  }

  /** @param {string} resource @param {Record<string, string>} parameters */
  async request(resource, parameters) {
    const url = new URL(`https://www.googleapis.com/youtube/v3/${resource}`);
    Object.entries({ ...parameters, key: this.key }).forEach(([name, value]) => url.searchParams.set(name, value));
    let response;
    try { response = await this.fetch(url, { signal: AbortSignal.timeout(15000) }); }
    catch { throw new CatalogError('unavailable', 'YouTube non è raggiungibile.'); }
    if (!response.ok) {
      let reason = '';
      try { reason = (await response.json()).error?.errors?.[0]?.reason || ''; } catch { /* HTTP status remains sufficient when the body is not JSON. */ }
      if (['quotaExceeded', 'dailyLimitExceeded'].includes(reason)) throw new CatalogError('quota_exceeded', 'La quota YouTube del progetto non è disponibile.');
      throw new CatalogError(response.status === 403 ? 'access_denied' : 'unavailable', 'YouTube non ha reso disponibile la raccolta. Verificare chiave, API e quota sul server.');
    }
    let result;
    try { result = await response.json(); }
    catch { throw new CatalogError('invalid_response', 'Risposta YouTube non valida.'); }
    if (!Array.isArray(result.items)) throw new CatalogError('invalid_response', 'Elenco YouTube non valido.');
    return result;
  }

  /** @param {string} resource @param {Record<string, string>} parameters */
  async allPages(resource, parameters) {
    const items = [];
    const seen = new Set();
    let token = '';
    do {
      const page = await this.request(resource, { ...parameters, maxResults: '50', ...(token ? { pageToken: token } : {}) });
      items.push(...page.items);
      token = page.nextPageToken || '';
      if (token && seen.has(token)) throw new CatalogError('invalid_response', 'Paginazione YouTube non valida.');
      seen.add(token);
    } while (token);
    return items;
  }

  /** @returns {Promise<Catalog>} */
  async catalog() {
    if (!this.key) throw new CatalogError('not_configured', 'La chiave YouTube Data API non è configurata sul server.');
    const channels = await this.request('channels', { part: 'snippet,contentDetails', id: this.channelId });
    const channel = channels.items.find(item => item.id === this.channelId);
    const uploadsId = channel?.contentDetails?.relatedPlaylists?.uploads;
    if (!uploadsId) throw new CatalogError('channel_not_found', 'Il canale YouTube non è disponibile.');
    const [uploads, playlistResources] = await Promise.all([
      this.allPages('playlistItems', { part: 'contentDetails', playlistId: uploadsId }),
      this.allPages('playlists', { part: 'snippet,status', channelId: this.channelId }),
    ]);
    const playlists = [];
    const ids = new Set(uploads.map(item => item.contentDetails?.videoId).filter(id => /^[\w-]{11}$/.test(id || '')));
    // Bounded concurrency limits quota bursts without truncating long playlists.
    const publicPlaylists = playlistResources.filter(item => item.status?.privacyStatus === 'public');
    for (let offset = 0; offset < publicPlaylists.length; offset += 3) {
      const batch = await Promise.all(publicPlaylists.slice(offset, offset + 3).map(async item => {
        const entries = await this.allPages('playlistItems', { part: 'contentDetails', playlistId: item.id });
        const videoIds = [...new Set(entries.map(entry => entry.contentDetails?.videoId).filter(id => /^[\w-]{11}$/.test(id || '')))];
        videoIds.forEach(id => ids.add(id));
        return { id: item.id, title: String(item.snippet?.title || 'Playlist'), description: String(item.snippet?.description || ''), videoIds };
      }));
      playlists.push(...batch);
    }
    const videos = [];
    const allIds = [...ids];
    for (let offset = 0; offset < allIds.length; offset += 50) {
      const response = await this.request('videos', { part: 'snippet,contentDetails,status', id: allIds.slice(offset, offset + 50).join(',') });
      for (const item of response.items) {
        if (item.snippet?.channelId !== this.channelId || item.status?.privacyStatus !== 'public' || ['upcoming', 'live'].includes(item.snippet?.liveBroadcastContent)) continue;
        const publishedAt = item.snippet?.publishedAt;
        if (!/^[\w-]{11}$/.test(item.id) || !Number.isFinite(Date.parse(publishedAt))) continue;
        const thumbnails = item.snippet.thumbnails || {};
        const thumbnail = thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || '';
        videos.push({
          id: item.id, title: String(item.snippet.title || 'Messaggio della chiesa'), publishedAt,
          thumbnail: /^https:\/\/(?:i\.ytimg\.com|img\.youtube\.com)\//.test(thumbnail) ? thumbnail : '',
          duration: String(item.contentDetails?.duration || ''), embeddable: item.status.embeddable === true,
        });
      }
    }
    videos.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.id.localeCompare(b.id));
    const availableIds = new Set(videos.map(video => video.id));
    const catalog = {
      channelId: this.channelId, channelTitle: String(channel.snippet?.title || 'Chiesa Emmanuele'),
      channelUrl: `https://www.youtube.com/channel/${this.channelId}`, updatedAt: new Date().toISOString(), videos,
      playlists: playlists.map(playlist => ({ ...playlist, videoIds: playlist.videoIds.filter(id => availableIds.has(id)) })),
    };
    return catalog;
  }
}

/** Single-flight cache. Complete snapshots only; stale fallback expires after 24 h. */
export class CatalogService {
  /** @param {{client: YouTubeClient, ttlMs?: number, cacheFile?: string, now?: () => number}} options */
  constructor({ client, ttlMs = 900000, cacheFile = '', now = Date.now }) {
    this.client = client;
    this.ttlMs = ttlMs;
    this.cacheFile = cacheFile;
    this.now = now;
    /** @type {Catalog | null} */ this.snapshot = null;
    /** @type {Promise<{data: Catalog, stale: boolean}> | null} */ this.pending = null;
    this.retryAfter = 0;
    this.lastError = null;
    this.restore = this.restoreSnapshot();
  }

  async restoreSnapshot() {
    if (!this.cacheFile) return;
    try {
      const data = JSON.parse(await readFile(this.cacheFile, 'utf8'));
      if (data.channelId === this.client.channelId && Array.isArray(data.videos) && Array.isArray(data.playlists) && Number.isFinite(Date.parse(data.updatedAt))) this.snapshot = data;
    } catch { /* A missing or invalid cache never prevents a fresh API request. */ }
  }

  async get() {
    await this.restore;
    // Removing the key deliberately disables access, including restored snapshots.
    if (!this.client.key) throw new CatalogError('not_configured', 'La chiave YouTube Data API non è configurata sul server.');
    const age = this.snapshot ? this.now() - Date.parse(this.snapshot.updatedAt) : Infinity;
    if (age < this.ttlMs) return { data: this.snapshot, stale: false };
    if (this.retryAfter > this.now()) {
      if (age < 86400000) return { data: this.snapshot, stale: true };
      throw this.lastError || new CatalogError('unavailable', 'La raccolta YouTube non è temporaneamente disponibile.');
    }
    // Serve a complete recent snapshot immediately while updating in the background.
    // A slow YouTube synchronization must not hold every page request open.
    if (this.snapshot && age < 86400000) {
      this.startRefresh();
      return { data: this.snapshot, stale: true };
    }
    return this.startRefresh();
  }

  startRefresh() {
    if (!this.pending) {
      const operation = this.refresh();
      this.pending = operation;
      // Both branches consume the background rejection and clear single-flight state.
      const clear = () => { if (this.pending === operation) this.pending = null; };
      void operation.then(clear, clear);
    }
    return this.pending;
  }

  async refresh() {
    try {
      const data = await this.client.catalog();
      this.snapshot = data;
      this.retryAfter = 0;
      this.lastError = null;
      if (this.cacheFile) {
        try {
          await mkdir(path.dirname(this.cacheFile), { recursive: true });
          const temporary = `${this.cacheFile}.tmp`;
          await writeFile(temporary, JSON.stringify(data), { mode: 0o600 });
          await rename(temporary, this.cacheFile);
        } catch { /* The in-memory cache remains usable on read-only hosting. */ }
      }
      return { data, stale: false };
    } catch (error) {
      this.lastError = error;
      this.retryAfter = this.now() + (error.code === 'quota_exceeded' ? 3600000 : error.code === 'access_denied' ? 900000 : 60000);
      if (this.snapshot && this.now() - Date.parse(this.snapshot.updatedAt) < 86400000) return { data: this.snapshot, stale: true };
      throw error;
    }
  }
}

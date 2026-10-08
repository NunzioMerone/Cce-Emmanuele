import { mkdir, writeFile } from 'node:fs/promises';
import { fetchSermonCatalog } from '../src/services/sermon-catalog.mjs';

// Read public data from the configured local server. No API or SMTP credentials
// are read, exported or needed by the GitHub Pages build.
const endpoint = process.argv[2] || 'http://127.0.0.1:4173/api/sermons';
const catalog = await fetchSermonCatalog({ endpoint });
const snapshot = {
  status: 'ready', channelId: catalog.channelId, channelTitle: catalog.channelTitle,
  channelUrl: catalog.channelUrl, updatedAt: catalog.updatedAt,
  videos: catalog.videos.map(({ id, title, publishedAt, thumbnail, duration, embeddable }) => ({ id, title, publishedAt, thumbnail, duration, embeddable })),
  playlists: catalog.playlists.map(({ id, title, videoIds }) => ({ id, title, videoIds })),
};
const directory = new URL('../preview/', import.meta.url);
await mkdir(directory, { recursive: true });
await writeFile(new URL('sermons.json', directory), `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`Catalogo pubblico esportato: ${snapshot.videos.length} video, ${snapshot.playlists.length} playlist. Aggiornato: ${snapshot.updatedAt}.`);

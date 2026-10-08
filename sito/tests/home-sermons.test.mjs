import test from 'node:test';
import assert from 'node:assert/strict';
import { latestVideos } from '../src/domain/sermons.mjs';
import { fetchSermonCatalog } from '../src/services/sermon-catalog.mjs';
import { sermonCard } from '../src/components/sermon-card.mjs';

const video = (id, publishedAt) => ({ id, publishedAt, title: 'Un messaggio', thumbnail: '', duration: 'PT30M', embeddable: true });
const catalog = videos => ({ status: 'ready', channelId: 'church', channelTitle: 'Emmanuele', channelUrl: '', updatedAt: '2026-10-06T10:00:00Z', videos, playlists: [] });

test('La Home prende i tre messaggi più recenti e include i nuovi caricamenti, senza modificare il catalogo', () => {
  const videos = [video('aaaaaaaaaaa', '2026-09-20T10:00:00Z'), video('bbbbbbbbbbb', '2026-10-04T10:00:00Z'), video('ccccccccccc', '2026-09-13T10:00:00Z'), video('ddddddddddd', '2026-09-27T10:00:00Z')];
  const order = videos.map(item => item.id);
  assert.deepEqual(latestVideos(videos).map(item => item.id), ['bbbbbbbbbbb', 'ddddddddddd', 'aaaaaaaaaaa']);
  const upload = video('eeeeeeeeeee', '2026-10-11T10:00:00Z');
  assert.deepEqual(latestVideos([...videos, upload]).map(item => item.id), ['eeeeeeeeeee', 'bbbbbbbbbbb', 'ddddddddddd']);
  assert.deepEqual(videos.map(item => item.id), order);
  assert.deepEqual(latestVideos([]), []);
  assert.deepEqual(latestVideos([upload]), [upload]);
  assert.match(sermonCard(upload, false, { headingLevel: 'h3' }), /<h3 class="sermon-title">/);
});

test('Home e archivio leggono lo stesso endpoint e accettano la cache disponibile quando YouTube è irraggiungibile', async () => {
  const data = { ...catalog([video('aaaaaaaaaaa', '2026-10-04T10:00:00Z')]), status: 'stale' };
  const result = await fetchSermonCatalog({ fetchImpl: async (url, options) => {
    assert.equal(url, '/api/sermons');
    assert.equal(options.headers.Accept, 'application/json');
    return Response.json(data);
  } });
  assert.deepEqual(result, data);
  assert.deepEqual(await fetchSermonCatalog({ fetchImpl: async () => Response.json(catalog([])) }), catalog([]));
});

test('Risposte API non valide e configurazione mancante non diventano card inventate', async () => {
  await assert.rejects(fetchSermonCatalog({ fetchImpl: async () => Response.json({ status: 'not_configured' }, { status: 503 }) }), /not_configured/);
  for (const data of [null, { ...catalog([]), videos: null }, catalog([video('invalid-id', '2026-10-04T10:00:00Z')]), catalog([video('aaaaaaaaaaa', 'invalid-date')])]) {
    await assert.rejects(fetchSermonCatalog({ fetchImpl: async () => Response.json(data) }), /unavailable/);
  }
});

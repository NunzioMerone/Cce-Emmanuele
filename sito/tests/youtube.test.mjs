import test from 'node:test';
import assert from 'node:assert/strict';
import { YouTubeClient, CatalogService, CatalogError } from '../src/server/youtube.mjs';

const channelId = 'UCr3FkykCqsASxoHjVNK1h9g';
const videoId = index => `TEST${String(index).padStart(7, '0')}`;
const reply = data => new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });

test('Sincronizza tutte le pagine e conserva solo video pubblici del canale; ordina per pubblicazione', async () => {
  const requests = [];
  const client = new YouTubeClient({ key: 'secret-test-key', channelId, fetchImpl: async url => {
    requests.push(url);
    const resource = url.pathname.split('/').at(-1);
    const params = url.searchParams;
    if (resource === 'channels') return reply({ items: [{ id: channelId, snippet: { title: 'Chiesa' }, contentDetails: { relatedPlaylists: { uploads: 'uploads' } } }] });
    if (resource === 'playlists') return params.get('pageToken') === 'second' ? reply({ items: [{ id: 'series-b', snippet: { title: 'Serie B' }, status: { privacyStatus: 'public' } }] }) : reply({ nextPageToken: 'second', items: [{ id: 'series-a', snippet: { title: 'Serie A' }, status: { privacyStatus: 'public' } }, { id: 'private', status: { privacyStatus: 'private' } }] });
    if (resource === 'playlistItems') {
      const playlist = params.get('playlistId');
      if (playlist === 'uploads') return params.get('pageToken') ? reply({ items: Array.from({ length: 8 }, (_, index) => ({ contentDetails: { videoId: videoId(index + 50) } })) }) : reply({ nextPageToken: 'more', items: Array.from({ length: 50 }, (_, index) => ({ contentDetails: { videoId: videoId(index) } })) });
      return reply({ items: [{ contentDetails: { videoId: videoId(2) } }, { contentDetails: { videoId: videoId(2) } }, { contentDetails: { videoId: videoId(0) } }, { contentDetails: { videoId: videoId(59) } }] });
    }
    if (resource === 'videos') return reply({ items: params.get('id').split(',').filter(id => id !== videoId(0)).map(id => {
      const index = Number(id.slice(4));
      return { id, snippet: { title: id, channelId: index === 59 ? 'external-channel' : channelId, publishedAt: index === 2 ? '2026-10-06T10:00:00Z' : '2025-01-01T10:00:00Z', liveBroadcastContent: index === 3 ? 'upcoming' : 'none', thumbnails: { high: { url: 'https://i.ytimg.com/vi/test/hqdefault.jpg' } } }, status: { privacyStatus: index === 1 ? 'private' : 'public', embeddable: index !== 2 }, contentDetails: { duration: 'PT30M' } };
    }) });
    throw new Error('Unexpected API request');
  } });
  const data = await client.catalog();
  assert.equal(data.videos.length, 55);
  assert.equal(data.videos[0].id, videoId(2));
  assert.equal(data.videos[0].embeddable, false);
  assert.equal(data.playlists.length, 2);
  assert.deepEqual(data.playlists[0].videoIds, [videoId(2)]);
  assert.equal(requests.filter(url => url.pathname.endsWith('/videos')).length, 2);
  assert(!JSON.stringify(data).includes('secret-test-key'));
});

test('Non salta pagine in errore e non divulga la chiave in un errore', async () => {
  const client = new YouTubeClient({ key: 'secret-test-key', channelId, fetchImpl: async () => new Response('key=secret-test-key', { status: 403 }) });
  await assert.rejects(client.catalog(), error => error instanceof CatalogError && error.code === 'access_denied' && !error.message.includes('secret-test-key'));
});

test('Rifiuta paginazione ciclica senza generare un ciclo di richieste', async () => {
  const client = new YouTubeClient({ key: 'test', channelId, fetchImpl: async () => reply({ items: [], nextPageToken: 'loop' }) });
  await assert.rejects(client.allPages('playlists', {}), error => error.code === 'invalid_response');
});

test('Un errore di quota non provoca nuove richieste a ogni visita', async () => {
  let calls = 0;
  const client = new YouTubeClient({ key: 'test', channelId, fetchImpl: async () => {
    calls++;
    return new Response(JSON.stringify({ error: { errors: [{ reason: 'quotaExceeded' }] } }), { status: 403 });
  } });
  const service = new CatalogService({ client });
  await assert.rejects(service.get(), error => error.code === 'quota_exceeded');
  await assert.rejects(service.get(), error => error.code === 'quota_exceeded');
  assert.equal(calls, 1);
});

test('Cache: un’unica sincronizzazione concorrente, aggiornamento automatico e fallback con scadenza', async () => {
  let now = Date.parse('2026-10-06T10:00:00Z');
  let calls = 0;
  let fail = false;
  const client = { key: 'test', channelId, catalog: async () => {
    calls++;
    if (fail) throw new CatalogError('unavailable', 'Test outage');
    await Promise.resolve();
    return { channelId, updatedAt: new Date(now).toISOString(), videos: [{ id: videoId(calls) }], playlists: [] };
  } };
  const service = new CatalogService({ client, ttlMs: 1000, now: () => now });
  const results = await Promise.all([service.get(), service.get(), service.get()]);
  assert.equal(calls, 1);
  assert(results.every(result => result.data.videos[0].id === videoId(1)));
  now += 1001;
  const previous = await service.get();
  assert.equal(previous.stale, true);
  assert.equal(previous.data.videos[0].id, videoId(1));
  await service.pending;
  assert.equal((await service.get()).data.videos[0].id, videoId(2));
  assert.equal(calls, 2);
  now += 1001;
  fail = true;
  assert.equal((await service.get()).stale, true);
  assert.equal((await service.get()).stale, true);
  assert.equal(calls, 3, 'Il cooldown evita richieste ripetute durante un guasto.');
  now += 86400001;
  await assert.rejects(service.get());
  client.key = '';
  await assert.rejects(service.get(), error => error.code === 'not_configured');
});


test('Una cache recente risponde subito anche se la sincronizzazione resta sospesa, senza duplicarla', async () => {
  let now = Date.parse('2026-10-06T10:00:00Z');
  let finish;
  let calls = 0;
  const client = { key: 'test', channelId, catalog: () => {
    calls++;
    return new Promise(resolve => { finish = resolve; });
  } };
  const service = new CatalogService({ client, ttlMs: 1000, now: () => now });
  await service.restore;
  const old = { channelId, updatedAt: new Date(now - 2000).toISOString(), videos: [{ id: videoId(1) }], playlists: [] };
  service.snapshot = old;
  const responses = await Promise.all([service.get(), service.get(), service.get()]);
  assert.equal(calls, 1);
  assert(responses.every(response => response.stale && response.data === old));
  const updated = { ...old, updatedAt: new Date(now).toISOString() };
  finish(updated);
  await service.pending;
  assert.deepEqual(await service.get(), { data: updated, stale: false });
});

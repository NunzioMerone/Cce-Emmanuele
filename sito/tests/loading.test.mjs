import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchSermonCatalog } from '../src/services/sermon-catalog.mjs';
import { sermonSkeleton, sermonSkeletonGrid, catalogFeedback } from '../src/components/sermon-loading.mjs';
import { sermonsPage } from '../src/pages/sermons.mjs';
import { sermonCard } from '../src/components/sermon-card.mjs';

const catalog = { status: 'ready', videos: [], playlists: [], updatedAt: '2026-10-07T10:00:00Z' };
test('Una richiesta interrotta e un errore 503 si recuperano senza ricaricare la pagina', async () => {
  let calls = 0;
  const delays = [];
  const result = await fetchSermonCatalog({ fetchImpl: async () => {
    calls++;
    if (calls === 1) throw new TypeError('Network failed');
    if (calls === 2) return Response.json({ status: 'unavailable' }, { status: 503 });
    return Response.json(catalog);
  }, waitImpl: async ms => { delays.push(ms); } });
  assert.equal(calls, 3);
  assert.deepEqual(delays, [500, 1500]);
  assert.deepEqual(result, catalog);
});
test('Un guasto persistente termina dopo tre tentativi; una configurazione mancante non viene ritentata', async () => {
  let calls = 0;
  await assert.rejects(fetchSermonCatalog({ fetchImpl: async () => { calls++; throw new TypeError('Offline'); }, waitImpl: async () => {} }), /unavailable/);
  assert.equal(calls, 3);
  calls = 0;
  await assert.rejects(fetchSermonCatalog({ fetchImpl: async () => { calls++; return Response.json({ status: 'not_configured' }, { status: 503 }); }, waitImpl: async () => {} }), /not_configured/);
  assert.equal(calls, 1);
});
test('La pagina iniziale ha skeleton senza foto, video, titoli o azioni di riproduzione inventati', () => {
  const skeleton = sermonSkeleton(true) + sermonSkeletonGrid();
  assert(!/<img|data-video=|data-catalog-video=|<button/.test(skeleton));
  assert(!sermonsPage().includes('latest-fallback'));
  assert(sermonsPage().includes('sermon-skeleton--featured'));
  assert(catalogFeedback('Errore <test>').includes('data-load-retry'));
  assert(catalogFeedback('Errore <test>').includes('&lt;test&gt;'));
});
test('Una miniatura mancante resta neutra e non viene sostituita con una vecchia foto della chiesa', () => {
  const markup = sermonCard({ id: 'abcdefghijk', title: 'Video reale', publishedAt: '2026-10-07T10:00:00Z', thumbnail: '', duration: 'PT30M', embeddable: true });
  assert(markup.includes('video-no-thumbnail'));
  assert(!markup.includes('parola.webp'));
  assert(markup.includes('data-video="abcdefghijk"'));
});

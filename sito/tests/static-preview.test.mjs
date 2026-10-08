import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchSermonCatalog } from '../src/services/sermon-catalog.mjs';
import { document } from '../src/layouts/document.mjs';
import { pages } from '../src/pages/index.mjs';

test('Il catalogo statico si risolve sotto il percorso del progetto GitHub Pages', async () => {
  const endpoint = 'assets/data/sermons.json';
  let requested;
  await fetchSermonCatalog({ endpoint, fetchImpl: async url => {
    requested = new URL(url, 'https://nunziomerone.github.io/Cce-Emmanuele/prediche.html').href;
    return Response.json({ status: 'ready', updatedAt: '2026-10-08T11:31:29Z', videos: [], playlists: [] });
  } });
  assert.equal(requested, 'https://nunziomerone.github.io/Cce-Emmanuele/assets/data/sermons.json');
});

test('L’anteprima mantiene il modulo e chiarisce l’invio tramite email; il sito locale usa il server', () => {
  const contact = pages.find(page => page.slug === 'contatti');
  const preview = document(contact, { staticPreview: true });
  assert(preview.includes('name="sermon-catalog-url" content="assets/data/sermons.json"'));
  assert(preview.includes('data-delivery="email"'));
  assert(preview.includes('Apri la tua email'));
  assert(preview.includes('conferma l’invio nella tua app'));
  assert(preview.includes('name="robots" content="noindex, nofollow"'));
  const local = document(contact);
  assert(local.includes('data-delivery="server"'));
  assert(local.includes('Invia alla chiesa'));
  assert(!local.includes('name="sermon-catalog-url"'));
});

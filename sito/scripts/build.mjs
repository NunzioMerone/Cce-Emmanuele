import { publishDirectory } from './lib/publish.mjs';
import { mkdir, mkdtemp, writeFile, readFile, cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages/index.mjs';
import { document } from '../src/layouts/document.mjs';
import { escapeHtml } from '../src/utils/html.mjs';
import { church } from '../src/config/site.mjs';
import { fetchSermonCatalog } from '../src/services/sermon-catalog.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const staticPreview = process.argv.includes('--static-preview');
const destination = path.join(root, staticPreview ? 'dist-preview' : 'dist');

function validate() {
  for (const [key, value] of Object.entries(church)) {
    if (typeof value !== 'string') throw new Error(`Il dato ${key} deve essere una stringa.`);
    if (key.endsWith('Url') && value) {
      const url = new URL(value);
      if (url.protocol !== 'https:') throw new Error(`${key}: utilizzare un indirizzo HTTPS.`);
      if (url.username || url.password) throw new Error(`${key}: non inserire credenziali nei collegamenti.`);
    }
  }
  if (church.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(church.email)) throw new Error('Indirizzo email non valido.');
  if (church.phone && !/^\+?[\d\s()-]+$/.test(church.phone)) throw new Error('Numero di telefono non valido.');
  if (church.publicUrl && new URL(church.publicUrl).pathname !== '/') throw new Error('publicUrl deve indicare la radice del dominio del sito.');

}

validate();
await mkdir(path.join(root, '.cache'), { recursive: true });
const output = await mkdtemp(path.join(root, '.cache', 'build-'));
try {
await cp(path.join(root, 'public', 'assets'), path.join(output, 'assets'), {
  recursive: true,
  filter: source => !source.endsWith('-originale.png'),
});
if (staticPreview) {
  const snapshot = path.join(root, 'preview', 'sermons.json');
  await fetchSermonCatalog({ fetchImpl: async () => Response.json(JSON.parse(await readFile(snapshot, 'utf8'))) });
  await mkdir(path.join(output, 'assets', 'data'), { recursive: true });
  await cp(snapshot, path.join(output, 'assets', 'data', 'sermons.json'));
  await writeFile(path.join(output, '.nojekyll'), '');
}
for (const page of pages) await writeFile(path.join(output, `${page.slug}.html`), document(page, { staticPreview }));
// Publish only browser-safe modules. Their source remains shared with page rendering.
const browserModules = [
  'components/sermon-loading.mjs', 'components/button.mjs', 'components/icon.mjs', 'components/text-link.mjs',
  'components/series-results.mjs', 'components/sermon-card.mjs', 'components/playlist-section.mjs', 'components/carousel.mjs',
  'components/catalog-empty.mjs', 'components/filter-chip.mjs', 'components/filter-options.mjs',
  'utils/pagination.mjs', 'utils/html.mjs', 'utils/dates.mjs', 'utils/duration.mjs', 'utils/calendar.mjs', 'utils/carousel.mjs', 'utils/email-draft.mjs',
  'domain/sermons.mjs', 'config/ui.mjs',
  'services/sermon-catalog.mjs',
];
for (const module of browserModules) {
  const destination = path.join(output, 'assets/js', module);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(root, 'src', module), destination);
}
const publicUrl = church.publicUrl.replace(/\/$/, '');
await writeFile(path.join(output, 'robots.txt'), publicUrl ? `User-agent: *\nAllow: /\nSitemap: ${publicUrl}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');
if (publicUrl) {
  const urls = pages.map(page => `${publicUrl}/${page.slug === 'index' ? '' : `${page.slug}.html`}`);
  await writeFile(path.join(output, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${escapeHtml(url)}</loc></url>`).join('')}</urlset>`);
} else {
  await rm(path.join(output, 'sitemap.xml'), { force: true });
}
await publishDirectory(output, destination);
if (!publicUrl) await rm(path.join(destination, 'sitemap.xml'), { force: true });
} finally { await rm(output, { recursive: true, force: true }); }
console.log(`Sito generato: ${pages.length} pagine in ${path.basename(destination)}. ${staticPreview ? 'Anteprima statica con catalogo pubblico e invio tramite app di posta.' : 'Archivio prediche collegato all’API del server.'}`);

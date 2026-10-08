import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { pages } from '../src/pages/index.mjs';

const root = fileURLToPath(new URL(process.argv.includes('--static-preview') ? '../dist-preview/' : '../dist/', import.meta.url));
for (const page of pages) {
  const html = await readFile(path.join(root, `${page.slug}.html`), 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${page.slug}: serve un solo titolo principale.`);
  assert(html.includes('lang="it"'), `${page.slug}: lingua italiana mancante.`);
  assert(html.includes('aria-current="page"'), `${page.slug}: pagina attiva non indicata.`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, `${page.slug}: ID duplicati.`);
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const target = match[1];
    if (/^(https:|mailto:|tel:)/.test(target)) continue;
    const [file, fragment] = target.split('#');
    if (file) await access(path.resolve(root, file));
    if (fragment) {
      const destination = file ? await readFile(path.resolve(root, file), 'utf8') : html;
      assert(destination.includes(`id="${fragment}"`), `${page.slug}: destinazione ${target} assente.`);
    }
  }
}
async function checkModules(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) { await checkModules(file); continue; }
    const extension = path.extname(file);
    if (!['.css', '.js', '.mjs'].includes(extension)) continue;
    const content = await readFile(file, 'utf8');
    const references = extension === '.css'
      ? [...content.matchAll(/@import\s+url\(["']([^"']+)["']\)/g)]
      : [...content.matchAll(/(?:import|export)\s+(?:[^;\n]*?\s+from\s+)?["'](\.[^"']+)["']/g)];
    for (const match of references) {
      const target = path.resolve(path.dirname(file), match[1]);
      assert(target.startsWith(root), `Import esterno al sito generato: ${match[1]}`);
      await access(target);
    }
  }
}
await checkModules(path.join(root, 'assets'));
console.log('Verifica riuscita: pagine, navigazione, ancore, import CSS e moduli browser.');

import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CatalogService, YouTubeClient } from '../src/server/youtube.mjs';
import { church } from '../src/config/site.mjs';
import { createContactService, createContactHandler } from '../src/server/contact.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const contactHandler = createContactHandler(createContactService(process.env, church.email));
const cacheSeconds = Number(process.env.YOUTUBE_CACHE_SECONDS || 900);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT deve essere una porta valida.');
if (!Number.isFinite(cacheSeconds) || cacheSeconds < 60 || cacheSeconds > 86400) throw new Error('YOUTUBE_CACHE_SECONDS deve essere tra 60 e 86400.');
const catalog = new CatalogService({
  client: new YouTubeClient({ key: process.env.YOUTUBE_API_KEY || '', channelId: church.youtubeChannelId }),
  ttlMs: cacheSeconds * 1000,
  cacheFile: fileURLToPath(new URL('../.cache/youtube.json', import.meta.url)),
});
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  if (request.url?.split('?')[0] === '/api/contact') return contactHandler(request, response);
  if (!['GET', 'HEAD'].includes(request.method || '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }
  let requestUrl;
  try { requestUrl = new URL(request.url || '/', 'http://localhost'); }
  catch { response.writeHead(400).end(); return; }
  if (requestUrl.pathname === '/api/sermons') {
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
    try {
      const { data, stale } = await catalog.get();
      response.writeHead(200, headers);
      response.end(request.method === 'HEAD' ? undefined : JSON.stringify({ status: stale ? 'stale' : 'ready', ...data }));
    } catch (error) {
      response.writeHead(503, headers);
      response.end(request.method === 'HEAD' ? undefined : JSON.stringify({ status: error.code === 'not_configured' ? 'not_configured' : 'unavailable', channelUrl: church.youtubeUrl }));
    }
    return;
  }
  try {
    const pathname = decodeURIComponent(requestUrl.pathname);
    const file = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!file.startsWith(root) || !(await stat(file)).isFile()) throw new Error('Not found');
    response.writeHead(200, {
      'Content-Type': types[path.extname(file)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-cache',
    });
    if (request.method === 'HEAD') return response.end();
    const stream = createReadStream(file);
    stream.on('error', () => response.destroy());
    stream.pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Pagina non trovata');
  }
});
server.requestTimeout = 20000;
server.on('error', error => {
  console.error(`Impossibile avviare l'anteprima: ${error.message}`);
  process.exitCode = 1;
});
server.listen(port, host, () => console.log(`Sito disponibile: http://${host}:${port}`));

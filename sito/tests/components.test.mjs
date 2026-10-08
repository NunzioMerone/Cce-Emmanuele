import test from 'node:test';
import assert from 'node:assert/strict';
import { button } from '../src/components/button.mjs';
import { playlistSection } from '../src/components/playlist-section.mjs';
import { sermonCard } from '../src/components/sermon-card.mjs';
import { durationOption, playlistOption, monthOption, yearOptions } from '../src/components/filter-options.mjs';
import { seriesResults } from '../src/components/series-results.mjs';
import { sermonFilters } from '../src/components/sermon-filters.mjs';
import { videoPlayer } from '../src/components/video-player.mjs';

const video = { id: 'abcdefghijk', title: 'Fede <insieme> & vita', publishedAt: '2026-10-04T10:00:00Z', duration: 'PT20M', thumbnail: '', embeddable: true };

test('Il componente azione mantiene varianti, semantica, attributi accessibili e contenuto sicuro', () => {
  const link = button({ label: '<Ascolta>', href: 'https://example.com/?a=1&b=2', external: true, size: 'small' });
  assert.match(link, /class="button button--primary button--small"/);
  assert.match(link, /target="_blank" rel="noopener noreferrer"/);
  assert.match(link, /href="https:\/\/example.com\/\?a=1&amp;b=2"/);
  assert.match(link, /&lt;Ascolta&gt;/);
  const action = button({ label: 'Applica', type: 'submit', variant: 'outline', iconName: null, attributes: { disabled: true, hidden: false, 'aria-label': 'Applica "filtri"' } });
  assert.match(action, /<button class="button button--outline" type="submit" disabled aria-label="Applica &quot;filtri&quot;">Applica<\/button>/);
  assert.throws(() => button({ label: 'Invalid', attributes: { onclick: 'alert(1)' } }));
});

test('Il catalogo limita l’anteprima a 12 messaggi e collega la serie completa', () => {
  const featured = sermonCard(video, true);
  assert.match(featured, /video-no-thumbnail/);
  assert.match(featured, /Fede &lt;insieme&gt; &amp; vita/);
  assert.match(featured, /20:00/);
  assert.doesNotMatch(featured, /Guarda su YouTube/);
  const group = { id: 'playlist', title: 'Genesi <serie>', videos: Array.from({ length: 500 }, (_, index) => ({ ...video, id: `video${index}` })) };
  const initial = playlistSection(group, 0);
  assert.equal((initial.match(/data-catalog-video=/g) || []).length, 12);
  assert.doesNotMatch(initial, /data-load-more|Mostra altri messaggi/);
  assert.match(initial, /href="serie.html\?playlist=playlist"/);
  assert.match(initial, /12 di 500 messaggi/);
  assert.match(initial, /Genesi &lt;serie&gt;/);
  assert.match(initial, /id="playlist-carousel-0"[^>]+data-carousel-max-visible="4"/);
  assert.match(initial, /aria-label="Genesi &lt;serie&gt;"/);
  assert.match(initial, /aria-controls="playlist-carousel-0-track"/);
  assert.match(playlistSection(group, 1), /id="playlist-carousel-1-track"/);
  const short = playlistSection({ ...group, videos: group.videos.slice(0, 4) }, 0);
  assert.equal((short.match(/data-catalog-video=/g) || []).length, 4);
  assert.match(short, /href="serie.html\?playlist=playlist"/);
  assert.doesNotMatch(short, /messaggi nell’anteprima/);
});

test('Le opzioni dei filtri condivise mantengono selezioni e nomi dei mesi', () => {
  assert.match(durationOption({ id: '0-20', label: '0–20 min', count: 1 }, ['0-20']), /value="0-20" checked/);
  assert.match(playlistOption({ id: 'pl', title: 'Serie <una>', videoIds: ['v'] }, ['pl']), /Serie &lt;una&gt;/);
  assert.match(monthOption('2026-10', ['2026-10']), /value="2026-10" checked aria-label="ottobre 2026"/);
  assert.match(yearOptions(['2026', '2019'], '2019'), /value="2019" selected/);
});

test('Le card aprono il player accessibile senza caricare iframe prima del clic', () => {
  const card = sermonCard(video);
  assert.match(card, /class="sermon-title-button" aria-haspopup="dialog" aria-controls="sermon-video-dialog"/);
  assert.doesNotMatch(card, /<iframe/);
  const dialog = videoPlayer();
  assert.match(dialog, /<dialog[^>]+id="sermon-video-dialog" aria-labelledby="sermon-video-title"/);
  assert.match(dialog, /aria-label="Chiudi il video" autofocus/);
  assert.match(dialog, /data-video-stage/);
  assert.doesNotMatch(dialog, /<iframe/);
  const unavailable = sermonCard({ ...video, embeddable: false });
  assert.doesNotMatch(unavailable, /sermon-title-button|video-load/);
  assert.match(unavailable, /class="video-external"/);
});

test('La modale di una serie offre durata e periodo senza una scelta playlist', () => {
  const series = sermonFilters({ includePlaylists: false });
  assert.match(series, /data-filter-tab="duration"/);
  assert.match(series, /data-filter-tab="period"/);
  assert.doesNotMatch(series, /tab-playlist|panel-playlist|playlist-filter-search/);
  assert.match(sermonFilters(), /tab-playlist/);
});

test('La serie completa mostra 20 card nella griglia e conserva quelle precedenti quando si espande', () => {
  const videos = Array.from({ length: 100 }, (_, index) => ({ ...video, id: `message${index}` }));
  const first = seriesResults({ videos, visible: 20 });
  assert.equal((first.markup.match(/data-catalog-video=/g) || []).length, 20);
  assert.match(first.markup, /class="series-grid" id="series-grid"/);
  assert.match(first.markup, /20 di 100 messaggi/);
  assert.match(first.markup, /data-series-more/);
  assert.doesNotMatch(first.markup, /data-carousel|Gruppo precedente|Gruppo successivo/);
  const expanded = seriesResults({ videos, visible: 40 });
  assert.equal((expanded.markup.match(/data-catalog-video=/g) || []).length, 40);
  assert.deepEqual(expanded.items.slice(0, 20), first.items);
  const complete = seriesResults({ videos, visible: 100 });
  assert.equal(complete.count, 100);
  assert.doesNotMatch(complete.markup, /data-series-more/);
  const short = seriesResults({ videos: videos.slice(0, 15), visible: 20 });
  assert.equal(short.count, 15);
  assert.doesNotMatch(short.markup, /data-series-more/);
});

test('Il filtro anno usa lo stesso menu personalizzato dell’ordinamento', () => {
  const modal = sermonFilters({ includePlaylists: false });
  assert.match(modal, /data-select-native/);
  assert.match(modal, /aria-controls="filter-month-year-list"/);
  assert.match(modal, /id="filter-month-year-list"[^>]+role="listbox"/);
  assert.match(modal, /data-select-option=""/);
});

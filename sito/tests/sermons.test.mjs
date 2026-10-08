import test from 'node:test';
import assert from 'node:assert/strict';
import { playlistArchive, archive, matchingVideos, groupedVideos, playlistGroup, emptyFilters, publicationDay, filtersFromUrl, filtersToUrl, durationSeconds, durationRangeId, OTHER_PLAYLIST } from '../src/domain/sermons.mjs';

test('La pagina di una serie conserva tutti i 500 messaggi e filtra soltanto la playlist richiesta', () => {
  const videos = Array.from({ length: 500 }, (_, index) => ({ id: `v${String(index).padStart(10, '0')}`, title: `Messaggio ${index}`, publishedAt: new Date(Date.UTC(2024, 0, index + 1)).toISOString() }));
  const collection = archive({ videos: [...videos, { id: 'outside', title: 'Messaggio esterno', publishedAt: '2026-01-01T10:00:00Z' }], playlists: [{ id: 'long', title: 'Serie lunga', videoIds: videos.map(video => video.id) }] });
  const complete = playlistGroup(collection, 'long');
  assert.equal(complete.videos.length, 500);
  assert.equal(complete.videos[0].id, videos[499].id);
  assert.equal(playlistGroup(collection, 'long', { ...emptyFilters(), sort: 'oldest' }).videos[0].id, videos[0].id);
  assert.deepEqual(playlistGroup(collection, 'long', { ...emptyFilters(), query: 'Messaggio 499' }).videos.map(video => video.id), [videos[499].id]);
  assert.equal(playlistGroup(collection, 'missing'), null);
  assert.deepEqual(playlistGroup(collection, OTHER_PLAYLIST).videos.map(video => video.id), ['outside']);
});

const catalog = {
  videos: [
    { id: 'latest', title: 'Ultimo messaggio', publishedAt: '2026-10-06T10:00:00Z' },
    { id: 'a', title: 'La fedeltà di Dio', publishedAt: '2026-09-10T10:00:00Z' },
    { id: 'b', title: 'Un passo di fede', publishedAt: '2026-08-31T22:30:00Z' },
    { id: 'c', title: 'Il valore della preghiera', publishedAt: '2026-08-01T10:00:00Z' },
  ],
  playlists: [{ id: 'one', title: 'Serie uno', videoIds: ['latest', 'a', 'b'] }, { id: 'two', title: 'Serie due', videoIds: ['a'] }],
};

test('L’ultima predica resta anche nell’archivio, nelle playlist e nei mesi disponibili', () => {
  const collection = archive(catalog);
  assert.equal(collection.latest.id, 'latest');
  assert.equal(collection.videos.length, 4);
  assert.deepEqual(collection.months, ['2026-10', '2026-09', '2026-08']);
  assert.equal(collection.playlists.at(-1).id, OTHER_PLAYLIST);
  const groups = groupedVideos(collection, emptyFilters());
  assert.deepEqual(groups.map(group => group.videos.length), [3, 1, 1]);
  assert.equal(matchingVideos(collection, emptyFilters()).length, 4, 'Il totale conta i video una volta, anche in più playlist.');
  assert.deepEqual(matchingVideos(collection, { ...emptyFilters(), year: '2026', months: ['2026-10'] }).map(video => video.id), ['latest']);
  assert.equal(collection.maxDate, '2026-10-06');
});

test('Combina playlist, mesi, intervalli inclusivi e ricerca senza accenti', () => {
  const collection = archive(catalog);
  const filters = { ...emptyFilters(), playlists: ['one'], months: ['2026-09'], from: '2026-09-01', to: '2026-09-10', query: 'fedelta' };
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['a']);
  filters.query = '';
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['a', 'b']);
  filters.sort = 'oldest';
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['b', 'a']);
  filters.months = ['2026-08'];
  assert.equal(matchingVideos(collection, filters).length, 0);
});

test('Mesi e date rispettano Europe/Rome', () => {
  assert.equal(publicationDay('2026-08-31T22:30:00Z'), '2026-09-01');
});

test('I filtri sono condivisibili nell’URL, senza perdere selezioni multiple', () => {
  const filters = { ...emptyFilters(), year: '2026', playlists: ['one', 'two'], months: ['2026-09', '2026-08'], durations: ['0-20', '30-40'], from: '2026-08-01', to: '2026-09-10', query: 'fede & vita', sort: 'oldest' };
  assert.deepEqual(filtersFromUrl(filtersToUrl(filters)), filters);
});

test('Durate YouTube: ore, giorni, secondi frazionari e valori mancanti', () => {
  assert.equal(durationSeconds('PT1H2M3S'), 3723);
  assert.equal(durationSeconds('P1DT2H'), 93600);
  assert.equal(durationSeconds('PT20M0.5S'), 1200.5);
  for (const value of [undefined, '', 'P', 'PT', 'PT0S', 'P1DT', '20:00', 'PT-3M']) assert.equal(durationSeconds(value), null);
  assert.equal(durationRangeId('PT20M'), '0-20');
  assert.equal(durationRangeId('PT20M0.5S'), '20-30');
  assert.equal(durationRangeId('PT30M'), '20-30');
  assert.equal(durationRangeId('PT30M1S'), '30-40');
  assert.equal(durationRangeId('PT1H'), '50-60');
});

test('Fasce disponibili, confini senza sovrapposizioni e filtri combinati', () => {
  const collection = archive({
    ...catalog,
    videos: [...catalog.videos.map(video => ({ ...video, duration: video.id === 'a' ? 'PT20M' : video.id === 'b' ? 'PT20M1S' : 'PT30M' })),
      { id: 'long', title: 'La fede nella vita', publishedAt: '2026-09-02T10:00:00Z', duration: 'PT55M' },
      { id: 'unknown', title: 'Durata assente', publishedAt: '2026-09-02T10:00:00Z', duration: '' }],
  });
  assert.deepEqual(collection.durations.map(range => [range.id, range.count]), [['0-20', 1], ['20-30', 3], ['50-60', 1]]);
  const filters = { ...emptyFilters(), durations: ['0-20', '20-30'] };
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['latest', 'a', 'b', 'c']);
  filters.playlists = ['one'];
  filters.months = ['2026-09'];
  filters.from = '2026-09-01';
  filters.to = '2026-09-05';
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['b']);
  assert.equal(matchingVideos(collection, emptyFilters()).length, 6, 'Senza filtro durata restano inclusi i video di durata sconosciuta.');
  const next = archive({ ...catalog, videos: [...catalog.videos, { id: 'd', title: 'Nuovo', publishedAt: '2026-09-05T10:00:00Z', duration: 'PT35M' }] });
  assert(next.durations.some(range => range.id === '30-40'));
});

test('L’URL scarta fasce non valide e deduplica le durate', () => {
  assert.deepEqual(filtersFromUrl('duration=0-20&duration=0-20&duration=20-30&duration=20-40&duration=-1-20&duration=abc').durations, ['0-20', '20-30']);
});

test('Date non valide nell’URL non interrompono la pagina', () => {
  const filters = filtersFromUrl('from=2026-99-99&to=2026-02-31&month=2026-13');
  assert.equal(filters.from, '');
  assert.equal(filters.to, '');
  assert.deepEqual(filters.months, []);
});

test('Nuovi video, playlist e mesi sono derivati dal catalogo aggiornato senza configurazioni manuali', () => {
  const updated = {
    videos: [...catalog.videos, { id: 'new', title: 'Nuovo messaggio', publishedAt: '2026-11-01T10:00:00Z' }],
    playlists: [...catalog.playlists, { id: 'new-series', title: 'Nuova serie', videoIds: ['new', 'latest'] }],
  };
  const collection = archive(updated);
  assert.equal(collection.latest.id, 'new');
  assert(collection.playlists.some(playlist => playlist.id === 'new-series'));
  assert(collection.months.includes('2026-10'));
  assert.deepEqual(matchingVideos(collection, { ...emptyFilters(), playlists: ['new-series'] }).map(video => video.id), ['new', 'latest']);
});

test('L’anno filtra da solo e si combina con mesi, durate e date locali', () => {
  const collection = archive({
    videos: [
      { id: 'winter', title: 'Messaggio', publishedAt: '2019-01-06T10:00:00Z', duration: 'PT25M' },
      { id: 'summer', title: 'Messaggio', publishedAt: '2019-07-07T10:00:00Z', duration: 'PT35M' },
      { id: 'new-year', title: 'Messaggio', publishedAt: '2019-12-31T23:30:00Z', duration: 'PT25M' },
    ], playlists: [],
  });
  assert.deepEqual(collection.years, ['2020', '2019']);
  const filters = { ...emptyFilters(), year: '2019' };
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['summer', 'winter']);
  filters.months = ['2019-07'];
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['summer']);
  filters.durations = ['20-30'];
  assert.equal(matchingVideos(collection, filters).length, 0);
  filters.months = [];
  assert.deepEqual(matchingVideos(collection, filters).map(video => video.id), ['winter']);
  assert.equal(filtersFromUrl('year=abc').year, '');
  assert.equal(filtersFromUrl('year=2019').year, '2019');
});

test('Un canale con una sola predica mantiene archivio e filtri disponibili', () => {
  const collection = archive({ videos: [catalog.videos[0]], playlists: [{ id: 'one', title: 'Serie', videoIds: ['latest'] }] });
  assert.equal(matchingVideos(collection, emptyFilters()).length, 1);
  assert.deepEqual(collection.months, ['2026-10']);
  assert.equal(groupedVideos(collection, emptyFilters())[0].videos[0].id, 'latest');
});

test('I filtri della serie derivano esclusivamente dai suoi anni e dalle sue durate', () => {
  const collection = archive({ videos: [
    { id: 'a', title: 'Un', publishedAt: '2019-07-07T10:00:00Z', duration: 'PT25M' },
    { id: 'b', title: 'Deux', publishedAt: '2020-10-04T10:00:00Z', duration: 'PT35M' },
    { id: 'outside', title: 'Trois', publishedAt: '2026-01-01T10:00:00Z', duration: 'PT55M' },
  ], playlists: [{ id: 'series', title: 'Serie', videoIds: ['a', 'b'] }] });
  const scoped = playlistArchive(collection, 'series');
  assert.deepEqual(scoped.years, ['2020', '2019']);
  assert.deepEqual(scoped.months, ['2020-10', '2019-07']);
  assert.deepEqual(scoped.durations.map(range => range.id), ['20-30', '30-40']);
  assert.deepEqual(matchingVideos(scoped, { ...emptyFilters(), year: '2019' }).map(video => video.id), ['a']);
  assert.deepEqual(matchingVideos(scoped, { ...emptyFilters(), durations: ['30-40'] }).map(video => video.id), ['b']);
  assert.equal(playlistArchive(collection, 'missing'), null);
  assert.deepEqual(playlistArchive(collection, OTHER_PLAYLIST).videos.map(video => video.id), ['outside']);
});

import { durationRangeId } from '../utils/duration.mjs';
export { durationSeconds, durationRangeId } from '../utils/duration.mjs';

/** @typedef {import('../server/youtube.mjs').Catalog} Catalog */
/** @typedef {{playlists: string[], year: string, months: string[], durations: string[], from: string, to: string, query: string, sort: string}} Filters */
export const OTHER_PLAYLIST = '__other__';
export const emptyFilters = () => ({ playlists: [], year: '', months: [], durations: [], from: '', to: '', query: '', sort: 'newest' });
export const normalize = value => value.toLocaleLowerCase('it').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const dayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' });

/** @param {import('../server/youtube.mjs').Video[]} videos @param {number} [limit] */
export function latestVideos(videos, limit = 3) {
  return [...videos].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.id.localeCompare(b.id)).slice(0, limit);
}

/** Use publication dates in the church's local time, not playlist insertion dates. */
export function publicationDay(timestamp) {
  const parts = dayFormat.formatToParts(new Date(timestamp));
  return ['year', 'month', 'day'].map(type => parts.find(part => part.type === type).value).join('-');
}

/** @param {Catalog} catalog */
export function archive(catalog) {
  const latest = latestVideos(catalog.videos, 1)[0] || null;
  const videos = [...catalog.videos];
  const ids = new Set(videos.map(video => video.id));
  const playlists = catalog.playlists.map(playlist => ({ ...playlist, videoIds: playlist.videoIds.filter(id => ids.has(id)) })).filter(playlist => playlist.videoIds.length);
  const assigned = new Set(playlists.flatMap(playlist => playlist.videoIds));
  const others = videos.filter(video => !assigned.has(video.id));
  if (others.length) playlists.push({ id: OTHER_PLAYLIST, title: 'Altri messaggi', description: 'I messaggi che non fanno parte di una playlist.', videoIds: others.map(video => video.id) });
  const months = [...new Set(videos.map(video => publicationDay(video.publishedAt).slice(0, 7)))].sort().reverse();
  const years = [...new Set(months.map(month => month.slice(0, 4)))];
  const days = videos.map(video => publicationDay(video.publishedAt)).sort();
  const durationCounts = new Map();
  videos.forEach(video => {
    const id = durationRangeId(video.duration);
    if (id) durationCounts.set(id, (durationCounts.get(id) || 0) + 1);
  });
  const durations = [...durationCounts].map(([id, count]) => {
    const [min, max] = id.split('-').map(Number);
    return { id, min, max, label: `${min}–${max} min`, count };
  }).sort((a, b) => a.min - b.min);
  return { latest, videos, playlists, years, months, durations, minDate: days[0] || '', maxDate: days.at(-1) || '' };
}

/** @param {ReturnType<typeof archive>} collection @param {Filters} filters */
export function matchingVideos(collection, filters) {
  const selectedIds = new Set(collection.playlists.filter(playlist => filters.playlists.includes(playlist.id)).flatMap(playlist => playlist.videoIds));
  const terms = normalize(filters.query).trim().split(/\s+/).filter(Boolean);
  return collection.videos.filter(video => {
    const day = publicationDay(video.publishedAt);
    return (!filters.playlists.length || selectedIds.has(video.id))
      && (!filters.year || day.startsWith(`${filters.year}-`))
      && (!filters.months.length || filters.months.includes(day.slice(0, 7)))
      && (!filters.durations.length || filters.durations.includes(durationRangeId(video.duration)))
      && (!filters.from || day >= filters.from) && (!filters.to || day <= filters.to)
      && terms.every(term => normalize(video.title).includes(term));
  }).sort((a, b) => (filters.sort === 'oldest' ? 1 : -1) * (Date.parse(a.publishedAt) - Date.parse(b.publishedAt)) || a.id.localeCompare(b.id));
}

/** @param {ReturnType<typeof archive>} collection @param {Filters} filters */
export function groupedVideos(collection, filters) {
  const videos = matchingVideos(collection, filters);
  return collection.playlists.filter(playlist => !filters.playlists.length || filters.playlists.includes(playlist.id)).map(playlist => {
    const ids = new Set(playlist.videoIds);
    return { ...playlist, videos: videos.filter(video => ids.has(video.id)) };
  }).filter(playlist => playlist.videos.length);
}

/** Return the entire selected series, including messages outside the archive preview.
 * @param {ReturnType<typeof archive>} collection @param {string} id @param {Filters} [filters] */
export function playlistGroup(collection, id, filters = emptyFilters()) {
  const playlist = collection.playlists.find(item => item.id === id);
  return playlist ? { ...playlist, videos: matchingVideos(collection, { ...filters, playlists: [id] }) } : null;
}

/** Derive filter choices exclusively from one series, including unassigned messages.
 * @param {ReturnType<typeof archive>} collection @param {string} id */
export function playlistArchive(collection, id) {
  const group = playlistGroup(collection, id);
  return group ? archive({ videos: group.videos, playlists: [group] }) : null;
}

export function filtersFromUrl(search) {
  const params = new URLSearchParams(search);
  const validDay = value => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value;
  return {
    year: /^\d{4}$/.test(params.get('year') || '') ? params.get('year') : '',
    playlists: [...new Set(params.getAll('playlist'))], months: [...new Set(params.getAll('month').filter(value => /^\d{4}-(0[1-9]|1[0-2])$/.test(value)))],
    durations: [...new Set(params.getAll('duration').filter(value => {
      if (!/^\d{1,6}-\d{1,6}$/.test(value)) return false;
      const [min, max] = value.split('-').map(Number);
      return (min === 0 && max === 20) || (min >= 20 && min % 10 === 0 && max === min + 10);
    }))],
    from: validDay(params.get('from')) ? params.get('from') : '',
    to: validDay(params.get('to')) ? params.get('to') : '',
    query: params.get('q') || '', sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
  };
}

/** @param {Filters} filters */
export function filtersToUrl(filters) {
  const params = new URLSearchParams();
  if (filters.year) params.set('year', filters.year);
  filters.playlists.forEach(id => params.append('playlist', id));
  filters.months.forEach(month => params.append('month', month));
  filters.durations.forEach(range => params.append('duration', range));
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.sort === 'oldest') params.set('sort', filters.sort);
  return params.toString();
}

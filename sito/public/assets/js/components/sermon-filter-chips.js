import { dateFormat, monthLabel } from '../utils/dates.mjs';
import { filterChip } from '../components/filter-chip.mjs';

/** @param {ReturnType<import('../domain/sermons.mjs').archive>} collection
 * @param {import('../domain/sermons.mjs').Filters} filters */
export function renderSermonFilterChips(collection, filters) {
  const get = id => document.getElementById(id);
  const chips = [
    ...filters.playlists.map(value => ({ kind: 'playlists', value, label: collection.playlists.find(item => item.id === value)?.title || value })),
    ...filters.months.map(value => ({ kind: 'months', value, label: monthLabel(value) })),
    ...(filters.year ? [{ kind: 'year', value: '', label: `Anno ${filters.year}` }] : []),
    ...filters.durations.map(value => ({ kind: 'durations', value, label: collection.durations.find(item => item.id === value)?.label || value })),
    ...(filters.from ? [{ kind: 'from', value: '', label: `Dal ${dateFormat.format(new Date(`${filters.from}T12:00:00Z`))}` }] : []),
    ...(filters.to ? [{ kind: 'to', value: '', label: `Al ${dateFormat.format(new Date(`${filters.to}T12:00:00Z`))}` }] : []),
  ];
  get('active-sermon-filters').innerHTML = chips.map(filterChip).join('');
  get('filter-count').textContent = String(chips.length);
  get('filter-count').hidden = !chips.length;
  get('clear-sermon-filters').hidden = !chips.length && !filters.query;
}


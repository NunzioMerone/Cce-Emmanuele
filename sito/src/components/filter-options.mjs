import { escapeHtml as esc } from '../utils/html.mjs';
import { monthLabel } from '../utils/dates.mjs';
import { icon } from './icon.mjs';

/** @param {{id: string, label: string, count: number}} range @param {string[]} selected */
export function durationOption(range, selected) {
  return `<label class="filter-option duration-option"><input type="checkbox" name="duration" value="${esc(range.id)}"${selected.includes(range.id) ? ' checked' : ''}><span class="duration-option-icon" aria-hidden="true">${icon('clock')}</span><span class="duration-option-copy"><strong>${esc(range.label)}</strong><small>${range.count} ${range.count === 1 ? 'messaggio' : 'messaggi'}</small></span></label>`;
}

/** @param {{id: string, title: string, videoIds: string[]}} playlist @param {string[]} selected */
export function playlistOption(playlist, selected) {
  return `<label class="filter-option" data-playlist-title="${esc(playlist.title)}"><input type="checkbox" name="playlist" value="${esc(playlist.id)}"${selected.includes(playlist.id) ? ' checked' : ''}><span>${esc(playlist.title)}</span><small>${playlist.videoIds.length}</small></label>`;
}

/** @param {string} month @param {string[]} selected */
export function monthOption(month, selected) {
  return `<label class="filter-option" data-year="${esc(month.slice(0, 4))}"><input type="checkbox" name="month" value="${esc(month)}"${selected.includes(month) ? ' checked' : ''} aria-label="${esc(monthLabel(month))}"><span>${esc(monthLabel(month).replace(/ \d{4}$/, ''))}</span></label>`;
}

/** @param {string[]} years @param {string} selected */
export function yearOptions(years, selected) {
  return '<option value="">Tutti gli anni</option>' + years.map(year => `<option value="${esc(year)}"${year === selected ? ' selected' : ''}>${esc(year)}</option>`).join('');
}

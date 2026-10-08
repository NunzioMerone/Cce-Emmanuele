import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/** @param {{kind: string, value: string, label: string}} chip */
export function filterChip(chip) {
  return `<button type="button" class="filter-chip" data-remove-filter="${escapeHtml(chip.kind)}" data-value="${escapeHtml(chip.value)}" aria-label="Rimuovi filtro ${escapeHtml(chip.label)}">${escapeHtml(chip.label)}${icon('close')}</button>`;
}

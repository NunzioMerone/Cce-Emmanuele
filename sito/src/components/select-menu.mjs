import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/** @param {{id:string, label:string, options:{value:string,label:string}[], value:string, className?:string}} config */
export function selectMenu({ id, label, options, value, className = '' }) {
  const selected = options.find(option => option.value === value) || options[0];
  return `<div class="select-menu ${escapeHtml(className)}" data-select-menu>
    <label id="${escapeHtml(id)}-label" for="${escapeHtml(id)}">${escapeHtml(label)}</label>
    <select id="${escapeHtml(id)}" data-select-native>${options.map(option => `<option value="${escapeHtml(option.value)}"${option === selected ? ' selected' : ''}>${escapeHtml(option.label)}</option>`).join('')}</select>
    <button type="button" class="select-menu-trigger" data-select-trigger hidden aria-haspopup="listbox" aria-expanded="false" aria-controls="${escapeHtml(id)}-list" aria-labelledby="${escapeHtml(id)}-label ${escapeHtml(id)}-value">
      <span id="${escapeHtml(id)}-value" data-select-value>${escapeHtml(selected?.label || '')}</span>${icon('chevron')}
    </button>
    <div class="select-menu-list" id="${escapeHtml(id)}-list" data-select-list role="listbox" aria-labelledby="${escapeHtml(id)}-label" hidden>
      ${options.map(option => `<button type="button" role="option" class="select-menu-option" data-select-option="${escapeHtml(option.value)}" tabindex="-1" aria-selected="${option === selected}"><span>${escapeHtml(option.label)}</span>${icon('check')}</button>`).join('')}
    </div>
  </div>`;
}

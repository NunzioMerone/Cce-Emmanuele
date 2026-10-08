import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/** @param {string} href @param {string} label @param {{external?: boolean, iconName?: string, variant?:'default'|'feature', id?:string, className?:string, ariaLabel?:string}} [options] */
export function textLink(href, label, { external = false, iconName = 'arrow', variant = 'default', id = '', className = '', ariaLabel = '' } = {}) {
  const feature = variant === 'feature';
  const content = feature ? `<span class="text-link-label">${escapeHtml(label)}</span>` : escapeHtml(label);
  const classes = ['text-link', feature ? 'text-link--feature' : '', className].filter(Boolean).join(' ');
  return `<a class="${escapeHtml(classes)}" href="${escapeHtml(href)}"${id ? ` id="${escapeHtml(id)}"` : ''}${ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : ''}${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${content} ${icon(iconName)}</a>`;
}

/** @param {string} href @param {string} label */
export function external(href, label) {
  return textLink(href, label, { external: true, iconName: 'external' });
}

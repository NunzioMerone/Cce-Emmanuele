import { escapeHtml } from '../utils/html.mjs';
import { icon } from './icon.mjs';

/**
 * Shared action component, rendered identically on the server and in the browser.
 * @param {{ label: string, href?: string, variant?: 'primary'|'outline'|'accent-outline'|'gold'|'light'|'text'|'icon-label',
 * size?: 'default'|'small'|'large', iconName?: string|null, external?: boolean,
 * type?: 'button'|'submit', className?: string, iconPosition?: 'start'|'end',
 * attributes?: Record<string, string|boolean>, suffix?: string }} options
 * `suffix` accepts only trusted component markup, never API or user content.
 */
export function button({ label, href, variant = 'primary', size = 'default', iconName = 'arrow', iconPosition = 'end', external = false, type = 'button', className = '', attributes = {}, suffix = '' }) {
  const classes = ['button', `button--${variant}`, ...(size !== 'default' ? [`button--${size}`] : []), className].filter(Boolean).join(' ');
  const extra = Object.entries(attributes).map(([name, value]) => {
    if (!/^(?:id|hidden|disabled|aria-[a-z-]+|data-[a-z-]+)$/.test(name)) throw new Error(`Unsupported button attribute: ${name}`);
    if (value === false) return '';
    return value === true ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`;
  }).join('');
  const symbol = iconName ? icon(iconName, `button-icon button-icon--${iconName}`) : '';
  const content = `${iconPosition === 'start' ? symbol : ''}${escapeHtml(label)}${iconPosition === 'end' ? symbol : ''}${suffix}`;
  if (href) return `<a class="${escapeHtml(classes)}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}${extra}>${content}</a>`;
  return `<button class="${escapeHtml(classes)}" type="${type}"${extra}>${content}</button>`;
}

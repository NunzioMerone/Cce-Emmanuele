import { church, navigation, branding } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { button } from './button.mjs';
import { icon } from './icon.mjs';

/** @param {string} slug @param {string} [currentPageSlug] */
export function navbar(slug, currentPageSlug = slug) {
  const links = navigation.map(item => {
    const active = slug === item.slug;
    if (!item.children?.length) {
      return `<a href="${escapeHtml(item.slug)}.html"${active ? ' aria-current="page"' : ''}>${escapeHtml(item.label)}</a>`;
    }
    const listId = `navigation-${item.slug}`;
    const entries = [item, ...item.children].map(entry => `<a class="navigation-dropdown-link" href="${escapeHtml(entry.slug)}.html"${currentPageSlug === entry.slug ? ' aria-current="page"' : ''}><span>${escapeHtml(entry.label)}</span>${icon('check')}</a>`).join('');
    return `<details class="navigation-dropdown${active ? ' is-active' : ''}">
      <summary class="navigation-dropdown-trigger" aria-controls="${escapeHtml(listId)}">${escapeHtml(item.label)}${icon('chevron')}</summary>
      <div class="navigation-dropdown-list" id="${escapeHtml(listId)}">${entries}</div>
    </details>`;
  }).join('');
  return `<a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="${escapeHtml(church.name)} — Home"><img src="${escapeHtml(branding.logo.src)}" alt="Chiesa Cristiana Evangelica Emmanuele" width="${branding.logo.width}" height="${branding.logo.height}"></a>
    ${button({ label: 'Menu', variant: 'outline', size: 'small', iconName: null, className: 'menu-toggle', attributes: { hidden: true, 'aria-expanded': 'false', 'aria-controls': 'navigazione' }, suffix: '<span class="menu-lines" aria-hidden="true"></span>' })}
    <nav class="navigation" id="navigazione" aria-label="Navigazione principale">${links}
    ${button({ href: slug === 'index' ? '#dove-trovarci' : 'index.html#dove-trovarci', label: 'Vieni a trovarci', variant: 'primary', size: 'small', attributes: { 'data-visit-link': true } })}</nav>
  </div></header>`;
}

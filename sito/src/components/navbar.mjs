import { church, navigation } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { button } from './button.mjs';
export function navbar(slug) {
  return `<a class="skip-link" href="#contenuto">Vai al contenuto</a>
  <header class="site-header"><div class="container header-inner">
    <a class="brand" href="index.html" aria-label="${escapeHtml(church.name)} — Home"><img src="assets/images/logo-emmanuele-navbar.svg" alt="Chiesa Cristiana Evangelica Emmanuele" width="904" height="290"></a>
    ${button({ label: 'Menu', variant: 'outline', size: 'small', iconName: null, className: 'menu-toggle', attributes: { hidden: true, 'aria-expanded': 'false', 'aria-controls': 'navigazione' }, suffix: '<span class="menu-lines" aria-hidden="true"></span>' })}
    <nav class="navigation" id="navigazione" aria-label="Navigazione principale">${navigation.map(item => `<a href="${item.slug}.html"${slug === item.slug ? ' aria-current="page"' : ''}>${item.label}</a>`).join('')}
    ${button({ href: slug === 'index' ? '#dove-trovarci' : 'index.html#dove-trovarci', label: 'Vieni a trovarci', variant: 'primary', size: 'small', attributes: { 'data-visit-link': true } })}</nav>
  </div></header>`;
}

import { church, navigation, contactPlaceholders, branding } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { currentYear } from '../utils/calendar.mjs';
import { icon } from './icon.mjs';

export function footer() {
  const emailContent = `${icon('mail')}<span>${escapeHtml(church.email || contactPlaceholders.email)}</span>`;
  const email = church.email ? `<a class="footer-email" href="mailto:${escapeHtml(church.email)}">${emailContent}</a>` : `<span class="footer-email">${emailContent}</span>`;
  const socials = [
    { url: church.instagramUrl, name: 'Instagram', symbol: 'instagram' },
    { url: church.facebookUrl, name: 'Facebook', symbol: 'facebook' },
    { url: church.youtubeUrl, name: 'YouTube', symbol: 'youtube' },
  ].filter(item => item.url);
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <a class="footer-brand" href="index.html" aria-label="${escapeHtml(church.name)} — Home"><img src="${escapeHtml(branding.logo.src)}" alt="Chiesa Emmanuele" width="${branding.logo.width}" height="${branding.logo.height}" loading="lazy"></a>
      <nav class="footer-navigation" aria-label="Navigazione nel piè di pagina">${navigation.map(item => `<a href="${item.slug}.html">${item.label}</a>`).join('')}</nav>
      ${socials.length ? `<nav class="footer-socials" aria-label="Seguici sui social">${socials.map(item => `<a href="${escapeHtml(item.url)}" aria-label="${escapeHtml(item.name)} — pagina della chiesa" title="${escapeHtml(item.name)}" target="_blank" rel="noopener noreferrer">${icon(item.symbol)}</a>`).join('')}</nav>` : ''}
    </div>
    <div class="container footer-bottom"><span>© <span data-current-year>${currentYear()}</span> ${escapeHtml(church.name)}</span>${email}</div>
  </footer>`;
}

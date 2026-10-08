import { church, branding } from '../config/site.mjs';
import { escapeHtml } from '../utils/html.mjs';
import { navbar } from '../components/navbar.mjs';
import { footer } from '../components/footer.mjs';

/** @param {{slug:string, navigationSlug?:string, title:string, description:string, stylesheet:string, render:(options:{staticPreview:boolean})=>string}} page
 * @param {{staticPreview?:boolean}} [options] */
export function document(page, { staticPreview = false } = {}) {
  const canonical = church.publicUrl ? `${church.publicUrl.replace(/\/$/, '')}/${page.slug === 'index' ? '' : page.slug + '.html'}` : '';
  const title = `${page.title} · Chiesa Emmanuele`;
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="theme-color" content="#201b4d">
${staticPreview ? '<meta name="sermon-catalog-url" content="assets/data/sermons.json">' : ''}
<meta property="og:type" content="website">
<meta property="og:locale" content="it_IT">
<meta property="og:site_name" content="${escapeHtml(church.name)}">
<meta property="og:title" content="${escapeHtml(title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">${canonical ? `<link rel="canonical" href="${escapeHtml(canonical)}">
<meta property="og:url" content="${escapeHtml(canonical)}">
<meta property="og:image" content="${escapeHtml(church.publicUrl.replace(/\/$/, ''))}/assets/images/comunita.webp">` : '<meta name="robots" content="noindex, nofollow">'}<link rel="icon" href="${escapeHtml(branding.favicon.png)}" type="image/png" sizes="32x32"><link rel="icon" href="${escapeHtml(branding.favicon.svg)}" type="image/svg+xml" sizes="any">
<link rel="stylesheet" href="assets/css/site.css">
<link rel="stylesheet" href="assets/css/pages/${page.stylesheet}.css">
<script type="module" src="assets/js/main.js">
</script>${page.slug === 'prediche' ? '<script type="module" src="assets/js/pages/sermons.js"></script>' : ''}${page.slug === 'serie' ? '<script type="module" src="assets/js/pages/series.js"></script>' : ''}${page.slug === 'index' ? '<script type="module" src="assets/js/pages/home.js"></script>' : ''}${page.slug === 'contatti' ? '<script type="module" src="assets/js/pages/contact.js"></script>' : ''}</head>
<body class="page-${escapeHtml(page.slug)}">${navbar(page.navigationSlug || page.slug, page.slug)}<main id="contenuto" tabindex="-1">${page.render({ staticPreview })}</main>${footer()}</body>
</html>`;
}

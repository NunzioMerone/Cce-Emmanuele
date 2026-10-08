import { escapeHtml } from '../utils/html.mjs';

/** @param {string} label @param {{tag?:'p'|'figcaption', className?:string}} [options] */
export function handwrittenNote(label, { tag = 'p', className = '' } = {}) {
  if (!['p', 'figcaption'].includes(tag)) throw new Error('Unsupported handwritten note element.');
  return `<${tag} class="handwritten-note ${escapeHtml(className)}"><svg viewBox="0 0 400 60" preserveAspectRatio="none" aria-hidden="true"><path d="M1 51C70 29 118 34 159 40S305 54 399 20"/></svg><span>${escapeHtml(label)}</span></${tag}>`;
}

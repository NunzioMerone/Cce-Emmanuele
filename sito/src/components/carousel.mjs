import { escapeHtml } from '../utils/html.mjs';
import { button } from './button.mjs';

/**
 * Responsive carousel for trusted component markup, including asynchronous items.
 * @param {{id:string, label:string, items:string[], minItemWidth?:number,
 * maxVisible?:number, trackClassName?:string, trackAttributes?:Record<string,string|boolean>}} options
 */
export function carousel({ id, label, items, minItemWidth = 260, maxVisible = 3, trackClassName = '', trackAttributes = {} }) {
  if (!/^[a-zA-Z][\w-]*$/.test(id)) throw new Error('Il carosello richiede un ID valido e univoco.');
  if (!Number.isFinite(minItemWidth) || minItemWidth < 1 || !Number.isInteger(maxVisible) || maxVisible < 1) {
    throw new Error('Dimensioni del carosello non valide.');
  }
  const attributes = Object.entries(trackAttributes).map(([name, value]) => {
    if (!/^(?:aria-[a-z-]+|data-[a-z-]+)$/.test(name)) throw new Error(`Attributo del carosello non supportato: ${name}`);
    if (value === false) return '';
    return value === true ? ` ${name}` : ` ${name}="${escapeHtml(value)}"`;
  }).join('');
  const arrow = (direction, name) => button({
    label: '', variant: 'outline', size: 'small', iconName: 'arrow', className: `carousel-arrow carousel-arrow--${direction}`,
    attributes: { [`data-carousel-${direction}`]: true, 'aria-label': name, 'aria-controls': `${id}-track` },
  });
  return `<div class="carousel" id="${id}" data-carousel data-carousel-min-width="${minItemWidth}" data-carousel-max-visible="${maxVisible}" role="region" aria-label="${escapeHtml(label)}">
    <div class="carousel-track ${escapeHtml(trackClassName)}" id="${id}-track" data-carousel-track role="group" aria-label="${escapeHtml(label)}"${attributes}>${items.join('')}</div>
    <div class="carousel-controls" data-carousel-controls hidden>
      ${arrow('previous', 'Vista precedente')}
      <div class="carousel-dots" data-carousel-dots role="group" aria-label="Avanzamento nella raccolta"></div>
      ${arrow('next', 'Vista successiva')}
    </div>
    <p class="visually-hidden" data-carousel-status role="status" aria-atomic="true"></p>
  </div>`;
}

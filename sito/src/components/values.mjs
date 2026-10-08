import { icon } from './icon.mjs';
export function values() {
  const items = [
    ['book', 'La Parola al centro', 'Ascoltare la Bibbia, comprenderla e lasciare che accompagni le scelte di ogni giorno.'],
    ['heart', 'Una fede quotidiana', 'Conoscere Cristo è un cammino che continua oltre gli incontri, nella vita di tutti i giorni.'],
    ['people', 'Il valore di essere insieme', 'Condividere domande, ascolto e incoraggiamento. Crescere nella fede, un passo alla volta.'],
  ];
  return `<div class="values-grid">${items.map(([symbol, title, text], index) => `<article class="value-card"><div class="value-top">${icon(symbol)}<span>0${index + 1}</span></div><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>`;
}

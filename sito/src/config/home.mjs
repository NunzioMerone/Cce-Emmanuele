/** @typedef {{src:string, alt:string, width:number, height:number}} HeroPhoto */

/** Fotografie autentiche fornite dalla chiesa; originali conservati in materiali/foto-chiesa. */
const photos = {
  smile: { src: 'assets/images/chiesa/sorriso-in-chiesa.webp', width: 1600, height: 900, alt: 'Un giovane della comunità sorride nella sala della Chiesa Emmanuele' },
  welcome: { src: 'assets/images/chiesa/benvenuto.webp', width: 1600, height: 1200, alt: 'Quattro persone insieme nella Chiesa Emmanuele' },
  worship: { src: 'assets/images/chiesa/lode.webp', width: 1600, height: 1200, alt: 'Canto e musica durante la lode nella Chiesa Emmanuele' },
  meeting: { src: 'assets/images/chiesa/incontro-in-chiesa.webp', width: 1600, height: 1200, alt: 'La comunità riunita per un incontro nella sala della chiesa' },
  table: { src: 'assets/images/chiesa/tavola-insieme.webp', width: 1600, height: 1200, alt: 'Un momento di condivisione intorno alla tavola' },
  friends: { src: 'assets/images/chiesa/amiche-insieme.webp', width: 1600, height: 1066, alt: 'Tre donne della comunità sorridono insieme' },
  word: { src: 'assets/images/chiesa/parola-insieme.webp', width: 1600, height: 1066, alt: 'Un gruppo della comunità riunito intorno a un tavolo con le Bibbie' },
  community: { src: 'assets/images/chiesa/comunita-all-aperto.webp', width: 1600, height: 1066, alt: 'Foto di gruppo della comunità all’aperto, con adulti e bambini' },
  companionship: { src: 'assets/images/chiesa/cammino-insieme.webp', width: 1600, height: 1067, alt: 'Due uomini della comunità sorridono insieme, con un braccio sulle spalle' },
};

/** @type {{intervalMs:number, photos:HeroPhoto[]}} */
export const homeSlideshow = {
  intervalMs: 3000,
  photos: [photos.smile, photos.welcome, photos.worship, photos.meeting, photos.table, photos.friends],
};

/** @type {Array<HeroPhoto & {position:'welcome'|'worship'|'word'|'community'}>} */
export const homeAboutPhotos = [
  { ...photos.friends, position: 'welcome' },
  { ...photos.worship, position: 'worship' },
  { ...photos.word, position: 'word' },
  { ...photos.community, position: 'community' },
];

export const homeWelcomePhoto = photos.companionship;

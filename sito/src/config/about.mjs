/** @typedef {{src:string, alt:string, width:number, height:number, caption?:string}} CommunityPhoto */

// Layout copy is intentionally provisional until the pastors supply their account.
export const aboutCopy = {
  short: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  long: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  brief: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

/** @type {Record<string, CommunityPhoto>} */
export const communityPhotos = {
  worship: { src: 'assets/images/chiesa/lode.webp', width: 1600, height: 1200, alt: 'Canto e musica durante la lode nella Chiesa Emmanuele' },
  friends: { src: 'assets/images/chiesa/amiche-insieme.webp', width: 1600, height: 1066, alt: 'Tre donne della comunità sorridono insieme' },
  community: { src: 'assets/images/chiesa/comunita-all-aperto.webp', width: 1600, height: 1066, alt: 'La comunità della Chiesa Emmanuele riunita all’aperto' },
  table: { src: 'assets/images/chiesa/tavola-insieme.webp', width: 1600, height: 1200, alt: 'Un momento di condivisione intorno alla tavola' },
  word: { src: 'assets/images/chiesa/parola-insieme.webp', width: 1600, height: 1066, alt: 'Un gruppo della comunità con le Bibbie intorno al tavolo' },
  gathering: { src: 'assets/images/chiesa/incontro-in-chiesa.webp', width: 1600, height: 1200, alt: 'Un incontro nella sala della Chiesa Emmanuele' },
};

export const bacoliPhoto = {
  src: 'assets/images/about/bacoli-panorama.webp', width: 1600, height: 1200,
  alt: 'Panorama di Bacoli e del porto di Miseno, con Punta Pennata, visto da Capo Miseno',
  author: 'Denghiù', source: 'https://commons.wikimedia.org/wiki/File:CapoMisenoBacoli3341TAW.JPG',
};

export const missionVision = [
  { title: 'La nostra missione', icon: 'target', description: aboutCopy.short },
  { title: 'La nostra visione', icon: 'binoculars', description: aboutCopy.short },
];
export const beliefs = [
  { title: 'La Bibbia', icon: 'book', description: aboutCopy.brief },
  { title: 'Gesù Cristo', icon: 'cross', description: aboutCopy.brief },
  { title: 'La Chiesa', icon: 'people', description: aboutCopy.brief },
  { title: 'Le persone', icon: 'heart', description: aboutCopy.brief },
  { title: 'Un impatto reale', icon: 'leaf', description: aboutCopy.brief },
];
// Labels reserve the timeline design without presenting unconfirmed dates as facts.
export const churchTimeline = [
  { label: 'Le origini', title: 'Lorem ipsum dolor', description: aboutCopy.short },
  { label: 'Insieme', title: 'Lorem ipsum dolor', description: aboutCopy.short },
  { label: 'Il cammino', title: 'Lorem ipsum dolor', description: aboutCopy.short },
  { label: 'Oggi', title: 'Lorem ipsum dolor', description: aboutCopy.short },
];
export const communityGallery = [
  { ...communityPhotos.table, caption: 'Condividere' },
  { ...communityPhotos.worship, caption: 'Lodare insieme' },
  { ...communityPhotos.community, caption: 'Crescere in famiglia' },
  { ...communityPhotos.word, caption: 'Intorno alla Parola' },
];

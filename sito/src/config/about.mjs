/** @typedef {{src:string, alt:string, width:number, height:number, caption?:string, source?:string, author?:string}} CommunityPhoto */

// Contenuti forniti dall’utente nel riferimento della pagina Chi siamo.
export const aboutCopy = {
  hero: 'Siamo una comunità di persone che hanno trovato in Gesù Cristo il senso della vita e la salvezza. Ci unisce il desiderio di conoscerlo sempre di più e di condividere con altri il messaggio del Vangelo.',
  mission: 'Desideriamo aiutare chi già crede a crescere nella conoscenza di Gesù e accompagnare chi ancora non lo conosce alla scoperta del Vangelo. Per questo ascoltiamo e approfondiamo la Bibbia, preghiamo insieme e ci incoraggiamo nella vita di ogni giorno.',
  name: 'Emmanuele significa “Dio con noi”. Il nostro nome esprime la fiducia nella presenza e nell’opera di Dio nella vita dei credenti e quando ci riuniamo come chiesa.',
  faith: 'Crediamo in un solo Dio, Padre, Figlio e Spirito Santo, e riconosciamo nella Bibbia la sua Parola e l’autorità per la nostra fede e la nostra vita.',
  territory: 'Desideriamo vedere sempre più persone conoscere Cristo. Guardiamo ai paesi vicini a Bacoli con il desiderio di contribuire alla nascita di nuove comunità e di sostenere la diffusione del Vangelo anche oltre la nostra città.',
  invitation: 'Desideri conoscere la Bibbia, Gesù e il messaggio del Vangelo? Hai dubbi o domande sulla fede? Sarai il benvenuto.',
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
  caption: 'Panorama di Bacoli e Miseno',
  author: 'Denghiù', source: 'https://commons.wikimedia.org/wiki/File:CapoMisenoBacoli3341TAW.JPG',
};

export const beliefs = [
  { title: 'La Parola di Dio', icon: 'book', description: 'La Bibbia è la guida sicura per conoscere Dio, vivere nella sua volontà e affrontare la vita di ogni giorno.' },
  { title: 'La preghiera', icon: 'prayer', description: 'Crediamo nella preghiera come relazione viva con Dio, per crescere, sostenerci e intercedere per gli altri.' },
  { title: 'La lode e l’adorazione', icon: 'music', description: 'Lo lodiamo con gratitudine per ciò che è e per ciò che fa, con il cuore, nella vita quotidiana e insieme come chiesa.' },
  { title: 'La comunione', icon: 'people', description: 'Siamo una famiglia spirituale che si incoraggia a vicenda, condivide il cammino di fede e serve insieme nella chiesa e nella comunità.' },
];
export const historicBacoliPhoto = {
  src: 'assets/images/about/bacoli-storica.webp', width: 960, height: 768,
  alt: 'Panorama storico di Miseno e Bacoli visto da Capo Miseno, fotografia di Giorgio Sommer',
  caption: 'Panorama storico di Bacoli e Miseno',
  author: 'Giorgio Sommer',
  source: 'https://commons.wikimedia.org/wiki/File:Sommer,_Giorgio_(1834-1914)_-_n._2568_-_Panorama_da_Capo_Miseno.jpg',
};

// Le immagini illustrano il racconto; le foto della comunità non sono documenti delle date indicate.
/** @type {{label:string, title:string, description:string, photo:CommunityPhoto}[]} */
export const churchTimeline = [
  {
    label: 'Fine anni ’70', title: 'Le prime testimonianze',
    description: 'Alla fine degli anni Settanta alcuni bacolesi accolgono il messaggio del Vangelo e iniziano a condividerlo con i propri familiari e conoscenti.\n\nNasce così la prima testimonianza evangelica a Bacoli: persone che hanno trovato in Cristo il senso della vita e la salvezza e desiderano farlo conoscere ad altri. Da queste origini prenderà forma anche la nostra comunità.',
    photo: historicBacoliPhoto,
  },
  {
    label: 'Anni ’80', title: 'La Chiesa Emmanuele',
    description: 'Negli anni Ottanta la prima comunità evangelica si divide in due chiese, una delle quali è la Chiesa Emmanuele.\n\nIl nome significa «Dio con noi» ed esprime ciò su cui si fonda la nostra vita comunitaria: la fiducia nella presenza e nell’opera di Dio, nella vita di ogni credente e quando ci riuniamo per ascoltare la sua Parola, pregare e adorarlo.',
    photo: communityPhotos.word,
  },
  {
    label: '1986', title: 'L’arrivo di Rod Jones',
    description: 'Durante gli studi alla London School of Theology, una visita nel Napoletano colpisce profondamente Rod Jones e lo porta a scegliere di trasferirsi qui.\n\nDal 1986 si dedica a tempo pieno al servizio pastorale e missionario nei Campi Flegrei, in particolare tra Bacoli e Pozzuoli. Il suo percorso si intreccia così con la storia della nostra chiesa e con l’annuncio del Vangelo nel territorio.',
    photo: bacoliPhoto,
  },
  {
    label: '2022', title: 'La sede nel centro storico',
    description: 'Dal 2022 la nostra sede è in via Gaetano De Rosa 81, nel centro storico di Bacoli, nella stessa zona in cui la chiesa aveva mosso i suoi primi passi.\n\nQui continuiamo a riunirci per ascoltare la Parola di Dio, pregare e lodare il Signore, accogliendo anche chi desidera conoscere Gesù, approfondire la Bibbia o fare domande sulla fede.',
    photo: communityPhotos.gathering,
  },
];

import { home } from './home.mjs';
import { about } from './about.mjs';
import { contact } from './contact.mjs';
import { sermonsPage } from './sermons.mjs';
import { seriesPage } from './series.mjs';
import { faithPage } from './faith.mjs';
import { identityPage } from './identity.mjs';

export const pages = [
  {
    slug: 'index',
    stylesheet: 'home',
    title: 'Home',
    description: 'Benvenuto nella Chiesa Cristiana Evangelica Emmanuele. Conoscere Cristo e farlo conoscere: una comunità, la Parola di Dio e un cammino da condividere.',
    render: home,
  },
  {
    slug: 'chi-siamo',
    stylesheet: 'about',
    title: 'Chi siamo',
    description: 'Conosci la Chiesa Cristiana Evangelica Emmanuele a Bacoli: la nostra fede, la visione, i pastori e la vita della comunità. Conoscere Cristo e farlo conoscere.',
    render: about,
  },
  {
    slug: 'la-nostra-fede',
    navigationSlug: 'chi-siamo',
    stylesheet: 'reading',
    title: 'La nostra fede',
    description: 'Orientamento ecclesiologico, fondamento della fede, distintivi dottrinali e dichiarazioni etiche della Chiesa Cristiana Evangelica Emmanuele.',
    render: faithPage,
  },
  {
    slug: 'identita-vita-comunitaria',
    navigationSlug: 'chi-siamo',
    stylesheet: 'reading',
    title: 'Identità e vita comunitaria',
    description: 'La nostra identità e la nostra vita comunitaria: il pieghevole completo con le citazioni bibliche e le attribuzioni originali.',
    render: identityPage,
  },
  {
    slug: 'prediche',
    stylesheet: 'sermons',
    title: 'Prediche',
    description: 'Ascolta i messaggi e le prediche della Chiesa Emmanuele. Uno spazio per ritrovare la Parola e riflettere durante la settimana.',
    render: sermonsPage,
  },
  {
    slug: 'serie',
    navigationSlug: 'prediche',
    stylesheet: 'series',
    title: 'Serie di prediche',
    description: 'Tutti i messaggi di una serie della Chiesa Emmanuele, aggiornati dal nostro canale YouTube.',
    render: seriesPage,
  },
  {
    slug: 'contatti',
    stylesheet: 'contact',
    title: 'Contatti',
    description: 'Informazioni e contatti della Chiesa Cristiana Evangelica Emmanuele. Scopri come conoscerci e prepararti alla tua prima visita.',
    render: contact,
  },
];

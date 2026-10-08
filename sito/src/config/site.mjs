import { weeklyMeetings, meetingSummary } from './appointments.mjs';

const churchStreet = 'Via Gaetano De Rosa 81';
const churchAddress = `${churchStreet}, Bacoli (NA)`;

/** Dati confermati della chiesa. Lasciare vuoti i recapiti ancora da confermare. */
export const church = {
  name: 'Chiesa Cristiana Evangelica Emmanuele',
  shortName: 'Emmanuele',
  motto: 'Conoscere Cristo e farlo conoscere.',
  email: 'cce.emmanuele@gmail.com',
  phone: '',
  address: churchAddress,
  streetAddress: churchStreet,
  postalCode: '80070',
  locality: 'Bacoli (NA)',
  meetingTimes: meetingSummary(weeklyMeetings[0]),
  mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchAddress + ', Italia')}`,
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.381750699064!2d14.0788558!3d40.797604199999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x133b135d2cb01947%3A0xfed9a3d71c9e0d81!2sChiesa%20Cristiana%20Evangelica%20Emmanuele!5e0!3m2!1sit!2sit!4v1791296426780!5m2!1sit!2sit',
  youtubeUrl: 'https://www.youtube.com/channel/UCr3FkykCqsASxoHjVNK1h9g',
  youtubeChannelId: 'UCr3FkykCqsASxoHjVNK1h9g',
  instagramUrl: 'https://www.instagram.com/cc_emmanuele/',
  facebookUrl: 'https://www.facebook.com/share/19YY2M7Tcb/?mibextid=wwXIfr',
  publicUrl: '',
};

/** Segnaposto visivi, senza collegamenti a recapiti non confermati. */
export const contactPlaceholders = { email: 'chiesa@example.org', phone: '+39 XXX XXX XXXX' };

export const navigation = [
  { slug: 'index', label: 'Home' },
  { slug: 'chi-siamo', label: 'Chi siamo' },
  { slug: 'prediche', label: 'Prediche' },
  { slug: 'contatti', label: 'Contatti' },
];

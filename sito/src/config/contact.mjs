import { weeklyMeetings } from './appointments.mjs';

export const contactHeroPhoto = {
  src: 'assets/images/chiesa/gruppo-in-acqua.webp',
  alt: 'Un gruppo della comunità Emmanuele insieme in acqua',
  width: 1600,
  height: 1200,
};

export const visitInformation = [
  ...weeklyMeetings.map(meeting => ({ icon: meeting.day === 'Domenica' ? 'calendar' : 'book', title: meeting.kind, detail: `${meeting.day} · ore ${meeting.time}`, description: meeting.description })),
  { icon: 'pin', title: 'Come raggiungerci', description: 'Ci trovi in Via Gaetano De Rosa 81, a Bacoli. In fondo alla pagina trovi mappa e indicazioni.' },
  { icon: 'people', title: 'Spazio per i bambini', detail: 'Scuola domenicale', description: 'La domenica puoi venire con i tuoi bambini: la scuola domenicale propone un percorso biblico pensato per loro.' },
];

export const contactQuestions = [
  { question: 'Devo avvisare prima di venire?', answer: 'Se vuoi preparare la tua prima visita, puoi scriverci o chiamare uno dei pastori. Saremo felici di darti le informazioni di cui hai bisogno.' },
  { question: 'Quando ci incontriamo?', answer: weeklyMeetings.map(meeting => `${meeting.kind}: ${meeting.day.toLocaleLowerCase('it-IT')} alle ${meeting.time}.`).join(' ') },
  { question: 'Posso venire anche se non conosco la chiesa?', answer: 'Sì, sei il benvenuto anche se è la tua prima volta. Puoi iniziare scoprendo chi siamo e portare con te le tue domande.' },
  { question: 'Posso venire con i miei bambini?', answer: 'Sì, la domenica puoi partecipare con i tuoi bambini. Per loro c’è la scuola domenicale, con un percorso biblico adatto ai bambini. Se desideri altre informazioni, puoi scriverci o contattare uno dei pastori.' },
  { question: 'Come posso parlare con qualcuno?', answer: 'Puoi scrivere all’email della chiesa oppure chiamare Rod Jones o Francesco Schiano Lomoriello ai numeri riportati in questa pagina.' },
  { question: 'Come posso chiedere una preghiera?', answer: 'Puoi contattare direttamente uno dei pastori oppure scriverci attraverso lo spazio di ascolto e preghiera qui sopra.' },
];

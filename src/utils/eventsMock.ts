import { Event } from "../types/events";

const getNextSaturday = (): string => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7 || 7;
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);
  return nextSaturday.toISOString().split("T")[0];
};

export const eventsMock: Event[] = [
  {
    id: "1",
    title: "Scienza e fede possono andare d'accordo?",
    description:
      "Una conferenza speciale che esplora il rapporto tra scienza moderna e fede cristiana. Il Dottor Luca Scopece condividerà la sua esperienza personale e professionale in questo affascinante dialogo.",
    date: getNextSaturday(),
    guest: "Dottor Luca Scopece",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Culto Domenicale",
    description:
      "Unisciti a noi per il culto domenicale. Un momento di lode, preghiera e insegnamento dalla Parola di Dio. Tutti sono benvenuti!",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Incontro Giovani",
    description:
      "Serata dedicata ai giovani con giochi, condivisione e studio biblico. Un'occasione per crescere insieme nella fede e nell'amicizia.",
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Incontro di Preghiera",
    description:
      "Momento comunitario di preghiera dove portiamo davanti al Signore le nostre richieste, ringraziamenti e intercessioni.",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Studio Biblico",
    description:
      "Approfondimento settimanale della Parola di Dio. Studiamo insieme le Scritture per comprendere meglio il messaggio divino.",
    date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

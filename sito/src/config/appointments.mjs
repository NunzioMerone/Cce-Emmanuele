/** Appuntamenti settimanali confermati della chiesa. */
export const weeklyMeetings = [
  {
    day: 'Domenica',
    time: '10:00',
    kind: 'Culto',
    title: 'Culto della domenica',
    description: 'Un tempo per lodare Dio, ascoltare la Sua Parola e stare insieme.',
    iconName: 'book',
  },
  {
    day: 'Giovedì',
    time: '18:00',
    kind: 'Studio della Parola',
    title: 'Studio della Parola',
    description: 'Approfondiamo insieme la Parola di Dio, per comprenderla e viverla ogni giorno.',
    iconName: 'book',
  },
];

/** @param {{kind: string, day: string, time: string}} meeting */
export function meetingSummary(meeting) {
  return `${meeting.kind} ogni ${meeting.day.toLocaleLowerCase('it-IT')} • ore ${meeting.time}`;
}

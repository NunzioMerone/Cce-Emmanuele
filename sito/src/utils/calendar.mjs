const yearFormat = new Intl.DateTimeFormat('en', { timeZone: 'Europe/Rome', year: 'numeric' });

/** @param {Date} [date] @returns {string} */
export function currentYear(date = new Date()) {
  return yearFormat.format(date);
}

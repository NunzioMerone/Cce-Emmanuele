/** @param {string} recipient
 * @param {{prayer:boolean,name:string,email:string,phone:string,message:string,callback:boolean}} values */
export function emailDraft(recipient, values) {
  if (!/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(recipient)) throw new Error('Destinatario email non valido.');
  const subject = values.prayer ? 'Richiesta di preghiera' : 'Un messaggio dal sito della Chiesa Emmanuele';
  const contact = [values.name && `Nome: ${values.name.trim()}`, values.email && `Email: ${values.email.trim()}`, values.phone && `Telefono: ${values.phone.trim()}`].filter(Boolean);
  const body = [values.message.trim(), ...(contact.length ? ['', ...contact] : []), ...(values.prayer && values.callback ? ['', 'Desidero essere ricontattato.'] : [])].join('\n');
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

import { emailDraft } from '../utils/email-draft.mjs';

for (const form of document.querySelectorAll('[data-contact-form]')) {
  if (!(form instanceof HTMLFormElement)) continue;
  form.hidden = false;
  const callback = form.querySelector('[data-contact-callback]');
  const fields = form.querySelector('[data-callback-fields]');
  const callbackLabel = form.querySelector('[data-callback-label]');
  const messageLabel = form.querySelector('[data-message-label]');

  function updateFields() {
    const topic = form.querySelector('input[name="topic"]:checked');
    const prayer = topic instanceof HTMLInputElement && topic.value === 'prayer';
    form.dataset.formKind = prayer ? 'prayer' : 'message';
    const needsReply = !prayer || callback instanceof HTMLInputElement && callback.checked;
    if (fields instanceof HTMLElement) {
      fields.hidden = !needsReply;
      for (const input of fields.querySelectorAll('input')) {
        input.disabled = !needsReply;
        input.required = needsReply;
      }
    }
    if (callbackLabel instanceof HTMLElement) callbackLabel.hidden = !prayer;
    if (messageLabel instanceof HTMLElement) messageLabel.textContent = prayer ? 'Raccontaci per cosa possiamo pregare' : 'Come possiamo aiutarti?';
  }
  form.addEventListener('change', updateFields);
  updateFields();
  const submit = form.querySelector('[data-contact-submit]');
  const status = form.querySelector('[data-form-status]');
  let sending = false;
  function showStatus(text) {
    if (!(status instanceof HTMLElement)) return;
    status.hidden = !text;
    status.textContent = text;
  }
  async function checkAvailability() {
    if (!(submit instanceof HTMLButtonElement)) return;
    submit.disabled = true;
    try {
      const response = await fetch('/api/contact', { headers: { Accept: 'application/json' }, cache: 'no-store', signal: AbortSignal.timeout(5000) });
      const data = response.ok ? await response.json() : null;
      if (!data?.available) {
        showStatus('Il modulo non è ancora disponibile. Puoi scriverci direttamente all’email della chiesa o chiamare uno dei pastori.');
        return;
      }
      submit.disabled = false;
    } catch {
      showStatus('Non riusciamo a collegarci al modulo. Puoi scriverci direttamente all’email della chiesa o chiamare uno dei pastori.');
    }
  }
  const emailDelivery = form.dataset.delivery === 'email';
  if (!emailDelivery) checkAvailability();
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (sending || !form.reportValidity() || !(submit instanceof HTMLButtonElement) || submit.disabled) return;
    const values = new FormData(form);
    if (emailDelivery) {
      window.location.href = emailDraft(form.dataset.recipient || '', {
        prayer: values.get('topic') === 'prayer', message: String(values.get('message') || ''),
        name: String(values.get('name') || ''), email: String(values.get('email') || ''),
        phone: '', callback: values.has('callback'),
      });
      showStatus('Il messaggio è pronto nella tua app di posta. Conferma lì l’invio alla chiesa.');
      return;
    }
    sending = true;
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    showStatus('Invio del messaggio in corso…');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ topic: values.get('topic'), message: String(values.get('message') || ''), name: String(values.get('name') || ''), email: String(values.get('email') || ''), callback: values.has('callback'), website: String(values.get('website') || '') }),
        signal: AbortSignal.timeout(35000),
      });
      const result = await response.json();
      if (!response.ok || result.status !== 'sent') {
        showStatus(response.status === 429 ? 'Hai inviato più messaggi in poco tempo. Attendi qualche minuto, oppure contattaci direttamente.' : response.status === 400 ? 'Controlla il messaggio e i tuoi recapiti prima di inviare.' : 'Il messaggio non è stato inviato. Il testo resta qui: puoi riprovare oppure contattarci direttamente.');
        return;
      }
      form.reset();
      updateFields();
      showStatus('Il tuo messaggio è stato inviato alla chiesa. Grazie per averci scritto.');
    } catch {
      showStatus('Non possiamo confermare l’invio. Il testo resta qui: attendi prima di riprovare, oppure contattaci direttamente.');
    } finally {
      sending = false;
      submit.disabled = false;
      form.setAttribute('aria-busy', 'false');
    }
  });
}

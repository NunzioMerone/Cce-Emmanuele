export interface ContactFormData {
  nome: string;
  cognome: string;
  cellulare?: string;
  messaggio: string;
}

export interface ContactFormErrors {
  nome?: string;
  cognome?: string;
  cellulare?: string;
  messaggio?: string;
}

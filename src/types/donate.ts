export interface DonationAmount {
  value: number;
  label: string;
}

export interface DonationFormData {
  amount: number;
  customAmount?: number;
  name?: string;
  email?: string;
}

import { BaseEntity } from "./common";

export interface Event extends BaseEntity {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time?: string;
  location?: string;
  guest?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventFormData {
  title: string;
  description: string;
  fullDescription?: string;
  date: string;
  time?: string;
  location?: string;
  guest?: string;
}

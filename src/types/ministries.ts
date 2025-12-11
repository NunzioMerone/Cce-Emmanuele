import { BaseEntity } from "./common";

export interface Ministry extends BaseEntity {
  title: string;
  description: string;
  image: string;
  order?: number;
  schedule?: string;
  fullDescription?: string;
}

export interface MinistryFormData {
  title: string;
  description: string;
  image: string;
}

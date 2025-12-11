import { BaseEntity } from "./common";

export interface BibleVerse {
  text: string;
  reference: string;
}

export interface Mission extends BaseEntity {
  content: string;
  verses: BibleVerse[];
}

export interface MissionFormData {
  content: string;
  verses: BibleVerse[];
}

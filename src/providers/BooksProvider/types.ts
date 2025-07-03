export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  imageUrl: string;
  chapters: Chapter[];
  categoryIds: number[];
  purchaseLink?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;

  finished?: boolean;
  finishedAt?: string;
  lastReadPageIndex?: number;
  lastReadAt?: string;
}

export interface BookCollection {
  id: string;
  name: string;
  books: string[];
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Chapter {
  title: string;
  content: ChapterContent[];
}

export type ChapterContent = Paragraph | KeyPoint;

export enum ContentType {
  PARAGRAPH = 'PARAGRAPH',
  KEY_POINT = 'KEY_POINT',
}

export interface Paragraph {
  type: ContentType.PARAGRAPH;
  text: string;
}

export enum KeyPointType {
  QUOTE = 'QUOTE', // Citações e frases memoráveis
  INSIGHT = 'INSIGHT', // Reflexões, lições e conceitos importantes
  MOMENT = 'MOMENT', // Momentos decisivos da história
}

export interface KeyPoint {
  type: ContentType.KEY_POINT;
  keyPointType: KeyPointType;
  text: string;
  reference?: string; // Quem disse (se aplicável)
}

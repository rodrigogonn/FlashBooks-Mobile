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

export enum ContentType {
  PARAGRAPH = 'PARAGRAPH',
  KEY_POINT = 'KEY_POINT',
}

export interface Paragraph {
  type: ContentType.PARAGRAPH;
  text: string;
}

export type ChapterContent = Paragraph;

export interface Chapter {
  title: string;
  content: ChapterContent[];
}

export interface BooksContextData {
  library: Book[];
  updateBookStatus: (id: string, lastReadPage: number) => void;
  finishBook: (id: string) => void;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  pages: Page[];
  finished: boolean;
  lastReadPage?: number;
  lastReadAt?: Date;
}

export enum ContentType {
  PARAGRAPH = 'PARAGRAPH',
  KEY_POINT = 'KEY_POINT',
}

export interface Paragraph {
  type: ContentType.PARAGRAPH;
  text: string;
}

export type PageContent = Paragraph;

export interface Page {
  title: string;
  content: PageContent[];
}

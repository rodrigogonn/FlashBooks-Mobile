import { Book } from 'contexts/booksContext';

export interface ReadingContextData {
  book: Book;
  currentPageIndex: number;
  changePage: (index: number) => void;
  /** Is a percentage */
  textSize: number;
  changeTextSize: (textSize: number) => void;
}

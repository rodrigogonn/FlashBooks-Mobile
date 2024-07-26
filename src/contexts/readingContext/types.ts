import { Book } from 'contexts/booksContext';

export interface ReadingContextData {
  book?: Book;
  changeReadingBook: (book: Book) => void;
  currentPageIndex: number;
  changePage: (index: number) => void;
  complete: () => void;
  completed: boolean;
  /** Is a percentage */
  textSize: number;
  changeTextSize: (textSize: number) => void;
  adjustmentsOpen: boolean;
  openAdjustments: () => void;
  closeAdjustments: () => void;
}

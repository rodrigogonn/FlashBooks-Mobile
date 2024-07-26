import { Book, useBooks } from 'contexts/booksContext';
import { ReactNode, useState } from 'react';
import { ReadingContext } from './context';

interface ReadingProviderProps {
  children: ReactNode;
}

export const ReadingProvider = ({ children }: ReadingProviderProps) => {
  const { finishBook, updateBookStatus } = useBooks();
  const [book, setBook] = useState<Book>();
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);
  const [textSize, setTextSize] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const changeReadingBook = (newBook: Book) => {
    const newLastReadPageIndex = newBook.finished
      ? 0
      : newBook.lastReadPageIndex || 0;
    setCurrentPageIndex(newLastReadPageIndex);
    updateBookStatus(newBook.id, { lastReadPageIndex: newLastReadPageIndex });
    setBook(newBook);
  };

  const changePage = (index: number) => {
    setCurrentPageIndex(index);
    if (!book || index > book.pages.length - 1) return;

    updateBookStatus(book.id, { lastReadPageIndex: index });
  };

  const changeTextSize = (textSize: number) => {
    setTextSize(textSize);
  };

  const complete = () => {
    if (!book) return;

    finishBook(book.id);
  };

  const openAdjustments = () => {
    setAdjustmentsOpen(true);
  };

  const closeAdjustments = () => {
    setAdjustmentsOpen(false);
  };

  return (
    <ReadingContext.Provider
      value={{
        book,
        changeReadingBook,
        currentPageIndex,
        changePage,
        complete,
        completed: book ? currentPageIndex >= book.pages.length : false,
        textSize: textSize,
        changeTextSize,
        adjustmentsOpen,
        openAdjustments,
        closeAdjustments,
      }}>
      {children}
    </ReadingContext.Provider>
  );
};

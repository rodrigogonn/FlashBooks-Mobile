import { Book } from 'contexts/booksContext';
import { ReactNode, useState } from 'react';
import { ReadingContext } from './context';

interface ReadingProviderProps {
  children: ReactNode;
}

export const ReadingProvider = ({ children }: ReadingProviderProps) => {
  const [book, setBook] = useState<Book>();
  const [textSize, setTextSize] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const changeTextSize = (textSize: number) => {
    setTextSize(textSize);
  };

  return (
    <ReadingContext.Provider
      value={{
        book,
        changeReadingBook: setBook,
        currentPageIndex,
        changePage: setCurrentPageIndex,
        textSize: textSize,
        changeTextSize,
      }}>
      {children}
    </ReadingContext.Provider>
  );
};

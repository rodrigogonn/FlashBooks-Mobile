import { useBooks } from 'contexts/booksContext';
import { ReactNode, useState } from 'react';
import { ReadingContext } from './Context';

interface ReadingProviderProps {
  children: ReactNode;
}

export const ReadingProvider = ({ children }: ReadingProviderProps) => {
  const { library } = useBooks();
  const book = library[0];

  const [textSize, setTextSize] = useState(1);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const changeTextSize = (textSize: number) => {
    setTextSize(textSize);
  };

  return (
    <ReadingContext.Provider
      value={{
        book,
        currentPageIndex,
        changePage: setCurrentPageIndex,
        textSize: textSize,
        changeTextSize,
      }}>
      {children}
    </ReadingContext.Provider>
  );
};

import { ReadingContext } from 'providers/ReadingProvider';
import { useContext, useEffect, useMemo } from 'react';

interface UseReadingProps {
  onComplete?: () => void;
}

export const useReading = (params?: UseReadingProps) => {
  const context = useContext(ReadingContext);
  if (!context) {
    throw new Error('useReading deve ser usado dentro do ReadingProvider');
  }

  const {
    book,
    currentPageIndex,
    started,
    textSize,
    adjustmentsOpen,
    changeReadingBook,
    changePage,
    changeTextSize,
    complete,
    openAdjustments,
    closeAdjustments,
    addCompleteListener,
    removeCompleteListener,
    startReading,
  } = context;

  const completed = book
    ? currentPageIndex && currentPageIndex >= book.chapters.length
    : false;
  const { onComplete } = params || {};

  useEffect(() => {
    if (!onComplete) return;

    addCompleteListener(onComplete);
    return () => {
      removeCompleteListener(onComplete);
    };
  }, [onComplete, addCompleteListener, removeCompleteListener]);

  const shouldDisplayDescription = useMemo(() => {
    if (!book) return false;
    if (started) return false;
    if (!book.finished && book.lastReadPageIndex !== undefined) {
      return false;
    }

    return true;
  }, [book, started]);

  return {
    book,
    currentPageIndex,
    textSize,
    adjustmentsOpen,
    completed,
    shouldDisplayDescription,
    changeReadingBook,
    changePage,
    changeTextSize,
    complete,
    openAdjustments,
    closeAdjustments,
    startReading,
  };
};

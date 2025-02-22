import { ReadingContext } from 'providers/ReadingProvider';
import { useContext, useEffect } from 'react';

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
  } = context;

  const completed = book ? currentPageIndex >= book.chapters.length : false;
  const { onComplete } = params || {};

  useEffect(() => {
    if (!onComplete) return;

    addCompleteListener(onComplete);
    return () => {
      removeCompleteListener(onComplete);
    };
  }, [onComplete, addCompleteListener, removeCompleteListener]);

  return {
    book,
    currentPageIndex,
    textSize,
    adjustmentsOpen,
    completed,
    changeReadingBook,
    changePage,
    changeTextSize,
    complete,
    openAdjustments,
    closeAdjustments,
  };
};

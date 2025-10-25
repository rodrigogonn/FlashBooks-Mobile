import { ReadingContext } from 'providers/ReadingProvider';
import { useContext, useEffect, useMemo } from 'react';
import { useReadingProgressStore } from 'stores/useReadingProgressStore';

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

  const currentPageFromStore = useReadingProgressStore(
    (s) => s.currentPageIndex
  );
  const completed = book
    ? currentPageFromStore >= (book?.chapters.length || 0)
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
    currentPageIndex: currentPageFromStore,
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

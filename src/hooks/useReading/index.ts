import { useEffect } from 'react';
import { useReadingStore } from 'stores/useReadingStore';

interface UseReadingProps {
  onComplete?: () => void;
}

export const useReading = (params?: UseReadingProps) => {
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
  } = useReadingStore();
  const completed = book ? currentPageIndex >= book.chapters.length : false;
  const { onComplete } = params || {};

  useEffect(() => {
    if (!onComplete) return;

    addCompleteListener(onComplete);
    return () => {
      removeCompleteListener(onComplete);
    };
  }, [onComplete]);

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

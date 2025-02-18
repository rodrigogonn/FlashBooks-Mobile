import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Book } from 'stores/useBooksStore/types';
import { useBooksStore } from 'stores/useBooksStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventEmitter, EventListener } from 'utils/eventEmitter';

interface ReadingState {
  book?: Book;
  currentPageIndex: number;
  textSize: number;
  adjustmentsOpen: boolean;
  completeEmitter: EventEmitter<void>;
  changeReadingBook: (newBook: Book) => void;
  changePage: (index: number) => void;
  changeTextSize: (value: number) => void;
  complete: () => void;
  openAdjustments: () => void;
  closeAdjustments: () => void;
  addCompleteListener: (listener: EventListener<void>) => void;
  removeCompleteListener: (listener: EventListener<void>) => void;
}

export const useReadingStore = create<ReadingState>()(
  persist(
    (set, get) => ({
      book: undefined,
      currentPageIndex: 0,
      textSize: 1,
      adjustmentsOpen: false,
      completeEmitter: new EventEmitter<void>(),

      changeReadingBook: (newBook: Book) => {
        const newPage = newBook.finished ? 0 : newBook.lastReadPageIndex || 0;
        set({ book: newBook, currentPageIndex: newPage });
        useBooksStore
          .getState()
          .updateBookStatus(newBook.id, { lastReadPageIndex: newPage });
      },

      changePage: (index: number) => {
        const { book } = get();
        set({ currentPageIndex: index });
        if (book && index <= book.chapters.length - 1) {
          useBooksStore
            .getState()
            .updateBookStatus(book.id, { lastReadPageIndex: index });
        }
      },

      changeTextSize: (value: number) => set({ textSize: value }),

      complete: () => {
        const { book, completeEmitter } = get();
        if (!book) return;
        useBooksStore.getState().finishBook(book.id);

        completeEmitter.emit();
      },

      openAdjustments: () => set({ adjustmentsOpen: true }),

      closeAdjustments: () => set({ adjustmentsOpen: false }),

      addCompleteListener: (listener: EventListener<void>) => {
        get().completeEmitter.addEventListener(listener);
      },
      removeCompleteListener: (listener: EventListener<void>) => {
        get().completeEmitter.removeEventListener(listener);
      },
    }),
    {
      name: 'reading-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ textSize }) => ({ textSize }),
    }
  )
);

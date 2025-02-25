import { useBooks } from 'hooks/useBooks';
import { Book } from 'providers/BooksProvider/types';
import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { EventEmitter, EventListener } from 'utils/eventEmitter';
import { createUserSpecificStorage } from 'utils/userStorageAdapter';

interface ReadingState {
  book?: Book;
  currentPageIndex?: number;
  started: boolean;
  textSize: number;
  adjustmentsOpen: boolean;
}

interface ReadingContextType extends ReadingState {
  changeReadingBook: (newBook: Book) => void;
  changePage: (index: number) => void;
  changeTextSize: (value: number) => void;
  complete: () => void;
  openAdjustments: () => void;
  closeAdjustments: () => void;
  addCompleteListener: (listener: EventListener<void>) => void;
  removeCompleteListener: (listener: EventListener<void>) => void;
  startReading: () => void;
}

type ReadingAction =
  | { type: 'CHANGE_BOOK'; payload: { book: Book } }
  | { type: 'CHANGE_PAGE'; payload: { index: number } }
  | { type: 'CHANGE_TEXT_SIZE'; payload: { value: number } }
  | { type: 'TOGGLE_ADJUSTMENTS'; payload: { open: boolean } }
  | { type: 'LOAD_PERSISTED_DATA'; payload: Pick<ReadingState, 'textSize'> }
  | { type: 'START_READING' };

export const ReadingContext = createContext<ReadingContextType | null>(null);

const completeEmitter = new EventEmitter<void>();

function readingReducer(
  state: ReadingState,
  action: ReadingAction
): ReadingState {
  switch (action.type) {
    case 'CHANGE_BOOK':
      return {
        ...state,
        book: action.payload.book,
        currentPageIndex: action.payload.book.lastReadPageIndex,
        started: false,
      };

    case 'CHANGE_PAGE':
      return {
        ...state,
        currentPageIndex: action.payload.index,
      };

    case 'CHANGE_TEXT_SIZE':
      return {
        ...state,
        textSize: action.payload.value,
      };

    case 'TOGGLE_ADJUSTMENTS':
      return {
        ...state,
        adjustmentsOpen: action.payload.open,
      };

    case 'LOAD_PERSISTED_DATA':
      return {
        ...state,
        textSize: action.payload.textSize,
      };

    case 'START_READING':
      return {
        ...state,
        started: true,
      };

    default:
      return state;
  }
}

const initialState: ReadingState = {
  book: undefined,
  currentPageIndex: undefined,
  started: false,
  textSize: 1,
  adjustmentsOpen: false,
};

const readingStoreKey = 'reading-store';

export const ReadingProvider = ({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) => {
  const [state, dispatch] = useReducer(readingReducer, initialState);
  const { updateBookStatus, finishBook } = useBooks();
  const storage = useMemo(() => createUserSpecificStorage(userId), [userId]);

  const loadPersistedData = useCallback(async () => {
    try {
      const persistedData = await storage.getItem(readingStoreKey);
      if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        const loadedState = {
          ...initialState,
          ...parsedData,
        };
        dispatch({
          type: 'LOAD_PERSISTED_DATA',
          payload: loadedState,
        });
      }
    } catch (error) {
      console.error('Error loading persisted reading data:', error);
    }
  }, [storage]);

  const persistData = useCallback(
    async (data: ReadingState) => {
      try {
        await storage.setItem(
          readingStoreKey,
          JSON.stringify({ textSize: data.textSize })
        );
      } catch (error) {
        console.error('Error persisting reading data:', error);
      }
    },
    [storage]
  );

  useEffect(() => {
    loadPersistedData();
  }, [loadPersistedData]);

  useEffect(() => {
    persistData(state);
  }, [state, persistData]);

  const changeReadingBook = useCallback((newBook: Book) => {
    dispatch({
      type: 'CHANGE_BOOK',
      payload: { book: newBook },
    });
  }, []);

  const changePage = useCallback(
    (index: number) => {
      dispatch({ type: 'CHANGE_PAGE', payload: { index } });
      if (state.book && index <= state.book.chapters.length - 1) {
        updateBookStatus(state.book.id, { lastReadPageIndex: index });
      }
    },
    [state.book, updateBookStatus]
  );

  const startReading = useCallback(() => {
    dispatch({ type: 'START_READING' });
    if (state.book) {
      updateBookStatus(state.book.id, { lastReadPageIndex: 0 });
    }
  }, [state.book, updateBookStatus]);

  const changeTextSize = useCallback((value: number) => {
    dispatch({ type: 'CHANGE_TEXT_SIZE', payload: { value } });
  }, []);

  const complete = useCallback(() => {
    if (!state.book) return;
    finishBook(state.book.id);
    completeEmitter.emit();
  }, [state.book, finishBook]);

  const openAdjustments = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADJUSTMENTS', payload: { open: true } });
  }, []);

  const closeAdjustments = useCallback(() => {
    dispatch({ type: 'TOGGLE_ADJUSTMENTS', payload: { open: false } });
  }, []);

  const addCompleteListener = useCallback((listener: EventListener<void>) => {
    completeEmitter.addEventListener(listener);
  }, []);

  const removeCompleteListener = useCallback(
    (listener: EventListener<void>) => {
      completeEmitter.removeEventListener(listener);
    },
    []
  );

  return (
    <ReadingContext.Provider
      value={{
        ...state,
        changeReadingBook,
        changePage,
        changeTextSize,
        complete,
        openAdjustments,
        closeAdjustments,
        addCompleteListener,
        removeCompleteListener,
        startReading,
      }}>
      {children}
    </ReadingContext.Provider>
  );
};

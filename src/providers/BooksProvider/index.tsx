import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { Book, BookCollection } from './types';
import { createUserSpecificStorage } from 'utils/userStorageAdapter';

interface BooksState {
  books: Book[];
  collections: BookCollection[];
  lastSync?: string;
}

interface BooksContextType extends BooksState {
  updateBookStatus: (
    id: string,
    updateOptions: { lastReadPageIndex: number }
  ) => void;
  finishBook: (id: string) => void;
  removeFromLibrary: (id: string) => void;
  startBook: (id: string) => void;
  syncData: (params: {
    books: Book[];
    bookCollections: BookCollection[];
    lastSync: string;
  }) => void;
}

type BooksAction =
  | {
      type: 'UPDATE_BOOK_STATUS';
      payload: { id: string; lastReadPageIndex: number };
    }
  | { type: 'FINISH_BOOK'; payload: { id: string } }
  | { type: 'REMOVE_FROM_LIBRARY'; payload: { id: string } }
  | { type: 'START_BOOK'; payload: { id: string } }
  | {
      type: 'SYNC_DATA';
      payload: {
        books: Book[];
        bookCollections: BookCollection[];
        lastSync: string;
      };
    }
  | { type: 'LOAD_PERSISTED_DATA'; payload: BooksState };

export const BooksContext = createContext<BooksContextType | null>(null);

function booksReducer(state: BooksState, action: BooksAction): BooksState {
  const currentDate = new Date().toISOString();

  switch (action.type) {
    case 'UPDATE_BOOK_STATUS':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                lastReadPageIndex: action.payload.lastReadPageIndex,
                lastReadAt: currentDate,
                finished: false,
                finishedAt: undefined,
              }
            : book
        ),
      };

    case 'FINISH_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                lastReadAt: currentDate,
                finished: true,
                finishedAt: currentDate,
              }
            : book
        ),
      };

    case 'REMOVE_FROM_LIBRARY':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                finished: false,
                finishedAt: undefined,
                lastReadPageIndex: undefined,
                lastReadAt: undefined,
              }
            : book
        ),
      };

    case 'START_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                finished: false,
                finishedAt: undefined,
              }
            : book
        ),
      };

    case 'SYNC_DATA':
      const updatedBooksStore = state.books.reduce<Book[]>(
        (acc, existingBook) => {
          const updatedBookFromAPI = action.payload.books.find(
            (book) => book.id === existingBook.id
          );
          if (updatedBookFromAPI && !updatedBookFromAPI.deletedAt) {
            acc.push({
              ...existingBook,
              ...updatedBookFromAPI,
            });
          } else if (!updatedBookFromAPI) {
            acc.push(existingBook);
          }
          return acc;
        },
        []
      );

      const newBooks = action.payload.books.filter(
        (book) =>
          !state.books.some((existingBook) => existingBook.id === book.id) &&
          !book.deletedAt
      );

      const updatedCollectionsStore = state.collections.reduce<
        BookCollection[]
      >((acc, existingCollection) => {
        const updatedCollectionFromAPI = action.payload.bookCollections.find(
          (collection) => collection.id === existingCollection.id
        );
        if (updatedCollectionFromAPI && !updatedCollectionFromAPI.deletedAt) {
          acc.push({
            ...existingCollection,
            ...updatedCollectionFromAPI,
          });
        } else if (!updatedCollectionFromAPI) {
          acc.push(existingCollection);
        }
        return acc;
      }, []);

      const newCollections = action.payload.bookCollections.filter(
        (collection) =>
          !state.collections.some(
            (existingCollection) => existingCollection.id === collection.id
          ) && !collection.deletedAt
      );

      return {
        books: [...updatedBooksStore, ...newBooks],
        collections: [...updatedCollectionsStore, ...newCollections],
        lastSync: action.payload.lastSync,
      };

    case 'LOAD_PERSISTED_DATA':
      return action.payload;

    default:
      return state;
  }
}

const initialState: BooksState = {
  books: [],
  collections: [],
  lastSync: undefined,
};

const booksStoreKey = 'books-storage';

export function BooksProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const [state, dispatch] = useReducer(booksReducer, initialState);
  const storage = useMemo(() => createUserSpecificStorage(userId), [userId]);

  const loadPersistedData = useCallback(async () => {
    try {
      const persistedData = await storage.getItem(booksStoreKey);
      if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        const loadedState = {
          ...initialState,
          ...parsedData,
        };
        dispatch({ type: 'LOAD_PERSISTED_DATA', payload: loadedState });
      }
    } catch (error) {
      console.error('Error loading persisted books data:', error);
    }
  }, [storage]);

  const persistData = useCallback(
    async (data: BooksState) => {
      try {
        await storage.setItem(booksStoreKey, JSON.stringify(data));
      } catch (error) {
        console.error('Error persisting books data:', error);
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

  const updateBookStatus = useCallback(
    (id: string, { lastReadPageIndex }: { lastReadPageIndex: number }) => {
      dispatch({
        type: 'UPDATE_BOOK_STATUS',
        payload: { id, lastReadPageIndex },
      });
    },
    []
  );

  const finishBook = useCallback((id: string) => {
    dispatch({ type: 'FINISH_BOOK', payload: { id } });
  }, []);

  const removeFromLibrary = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_FROM_LIBRARY', payload: { id } });
  }, []);

  const startBook = useCallback((id: string) => {
    dispatch({ type: 'START_BOOK', payload: { id } });
  }, []);

  const syncData = useCallback(
    (params: {
      books: Book[];
      bookCollections: BookCollection[];
      lastSync: string;
    }) => {
      dispatch({ type: 'SYNC_DATA', payload: params });
    },
    []
  );

  return (
    <BooksContext.Provider
      value={{
        ...state,
        updateBookStatus,
        finishBook,
        removeFromLibrary,
        startBook,
        syncData,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

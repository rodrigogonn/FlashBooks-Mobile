import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Book, ContentType, Chapter, BookCollection } from './types';

interface BooksState {
  books: Book[];
  collections: BookCollection[];
  lastSync?: string;
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

const bookMocked: Book = {
  id: '1',
  title: 'React Native',
  author: 'John Doe',
  description: 'Aprenda React Native com este livro incrível!',
  imageUrl: 'https://tm.ibxk.com.br/2020/09/18/18164115995317.jpg',
  categoryIds: [1, 2],
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01',
  finished: false,
  chapters: Array.from(
    { length: 3 },
    (): Chapter => ({
      title: 'O que é o React Native?',
      content: [
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma biblioteca que permite a criação de aplicativos móveis multiplataforma usando JavaScript e React. Com ele, você pode criar aplicativos para Android e iOS usando uma única base de código.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma extensão do React, uma biblioteca popular para a criação de interfaces de usuário. O React Native permite que você use o React para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
        {
          type: ContentType.PARAGRAPH,
          text: 'React Native é uma ótima opção para desenvolvedores que desejam criar aplicativos móveis nativos, mas não querem aprender uma nova linguagem de programação. Com o React Native, você pode usar JavaScript para criar aplicativos móveis nativos.',
        },
      ],
    })
  ),
};

const initialMockedBooks: Book[] = Array.from({ length: 20 }, (_, index) => ({
  ...bookMocked,
  id: index.toString(),
}));

export const useBooksStore = create<BooksState>()(
  persist(
    (set) => ({
      books: [],
      collections: [],
      lastSync: undefined,
      updateBookStatus: (id, { lastReadPageIndex }) => {
        const currentDate = new Date().toISOString();
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  lastReadPageIndex,
                  lastReadAt: currentDate,
                  finished: false,
                  finishedAt: undefined,
                }
              : book
          ),
        }));
      },
      finishBook: (id) => {
        const currentDate = new Date().toISOString();
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  lastReadAt: currentDate,
                  finished: true,
                  finishedAt: currentDate,
                }
              : book
          ),
        }));
      },
      removeFromLibrary: (id) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  finished: false,
                  finishedAt: undefined,
                  lastReadPageIndex: undefined,
                  lastReadAt: undefined,
                }
              : book
          ),
        }));
      },
      startBook: (id) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === id
              ? {
                  ...book,
                  finished: false,
                  finishedAt: undefined,
                }
              : book
          ),
        }));
      },
      syncData: ({
        books: updatedBooks,
        bookCollections: updatedCollections,
        lastSync,
      }) => {
        set((state) => {
          // Atualiza os livros existentes removendo os que possuem "deletedAt" preenchido
          const updatedBooksStore = state.books.reduce<Book[]>(
            (acc, existingBook) => {
              const updatedBookFromAPI = updatedBooks.find(
                (book) => book.id === existingBook.id
              );
              if (updatedBookFromAPI) {
                // Se o livro atualizado não tiver "deletedAt", efetua o merge
                if (!updatedBookFromAPI.deletedAt) {
                  acc.push({
                    ...existingBook,
                    ...updatedBookFromAPI,
                  });
                }
                // Caso contrário, não o adiciona (removendo-o da store)
              } else {
                acc.push(existingBook);
              }
              return acc;
            },
            []
          );

          // Adiciona os novos livros que não estavam salvos e que não possuem "deletedAt"
          const newBooks = updatedBooks.filter(
            (book) =>
              !state.books.some(
                (existingBook) => existingBook.id === book.id
              ) && !book.deletedAt
          );

          // Atualiza as coleções existentes removendo as que possuem "deletedAt" preenchido
          const updatedCollectionsStore = state.collections.reduce<
            BookCollection[]
          >((acc, existingCollection) => {
            const updatedCollectionFromAPI = updatedCollections.find(
              (collection) => collection.id === existingCollection.id
            );
            if (updatedCollectionFromAPI) {
              if (!updatedCollectionFromAPI.deletedAt) {
                acc.push({
                  ...existingCollection,
                  ...updatedCollectionFromAPI,
                });
              }
            } else {
              acc.push(existingCollection);
            }
            return acc;
          }, []);

          // Adiciona as novas coleções que não estavam salvas e que não possuem "deletedAt"
          const newCollections = updatedCollections.filter(
            (collection) =>
              !state.collections.some(
                (existingCollection) => existingCollection.id === collection.id
              ) && !collection.deletedAt
          );

          return {
            books: [...updatedBooksStore, ...newBooks],
            collections: [...updatedCollectionsStore, ...newCollections],
            lastSync,
          };
        });
      },
    }),
    {
      name: 'books-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

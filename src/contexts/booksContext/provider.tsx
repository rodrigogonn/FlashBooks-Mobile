import { useMemo, useState } from 'react';
import { BooksContext } from './context';
import { Book, ContentType, Page } from './types';

const bookMocked: Book = {
  id: '1',
  title: 'React Native',
  description: 'Aprenda React Native com este livro incrível!',
  imageSrc: 'https://tm.ibxk.com.br/2020/09/18/18164115995317.jpg',
  finished: false,
  pages: Array.from(
    { length: 3 },
    (): Page => ({
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

export const BooksProvider = ({ children }: { children?: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>(() =>
    Array.from({ length: 5 }, (_, index) => ({
      ...bookMocked,
      id: index.toString(),
    }))
  );

  const library = useMemo(
    // () => books.filter((book) => book.lastReadAt), @TODO filtrar somente os lidos
    () => books,
    [books]
  );

  const updateBookStatus = (id: string, lastReadPage: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              lastReadPage,
              lastReadAt: new Date(),
            }
          : book
      )
    );
  };

  const finishBook = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              finished: true,
            }
          : book
      )
    );
  };

  return (
    <BooksContext.Provider
      value={{
        library,
        updateBookStatus,
        finishBook,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

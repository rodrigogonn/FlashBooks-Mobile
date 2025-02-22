import { useNavigation } from '@react-navigation/native';
import { BookList } from 'components/BookList';
import { PageLayout } from 'components/PageLayout';
import { useMemo } from 'react';
import { RouteName, RouteParams, StackNavigation } from 'routes/types';
import { Categories } from './components/Categories';
import { categories } from 'constants/categories';
import { Book, BookCollection } from 'providers/BooksProvider/types';
import { DateTime } from 'luxon';
import { useBooks } from 'hooks/useBooks';

export const Discover = ({ route }: RouteParams<RouteName.Discover>) => {
  const stackNavigation = useNavigation<StackNavigation>();
  const { books, collections } = useBooks();

  const booksByCategory: {
    [categoryId: number]: Book[];
  } = useMemo(() => {
    return categories.reduce<{ [categoryId: number]: Book[] }>(
      (acc, category) => {
        const booksInCategory = books.filter((book) =>
          book.categoryIds.includes(category.id)
        );

        if (booksInCategory.length > 0) {
          acc[category.id] = booksInCategory;
        }

        return acc;
      },
      {}
    );
  }, [books, categories]);

  const categoriesWithBooks = useMemo(() => {
    return categories.filter((category) => booksByCategory[category.id]);
  }, [categories, booksByCategory]);

  const bookCollections: Array<{
    collection: BookCollection;
    books: Book[];
  }> = useMemo(() => {
    return collections.map((collection) => {
      const collectionBooks = collection.books
        .map((bookId) => books.find((book) => book.id === bookId))
        .filter((book): book is Book => !!book);

      return {
        collection,
        books: collectionBooks,
      };
    });
  }, [books, collections]);

  const lastReleases = useMemo(() => {
    return books
      .sort(
        (a, b) =>
          DateTime.fromISO(b.createdAt).toMillis() -
          DateTime.fromISO(a.createdAt).toMillis()
      )
      .slice(0, 20);
  }, [books]);

  const handleSelectBook = (book: Book) => {
    stackNavigation.navigate(RouteName.Reading, {
      book,
    });
  };

  return (
    <PageLayout header={{ title: route.name }}>
      {/* <BookList
        title="Para você"
        books={books}
        onSeeAll={() =>
          stackNavigation.navigate(RouteName.BookList, {
            title: 'Para você',
            books,
          })
        }
        onSelect={handleSelectBook}
      /> */}

      <BookList
        title="Últimos lançamentos"
        books={lastReleases}
        onSeeAll={() =>
          stackNavigation.navigate(RouteName.BookList, {
            title: 'Últimos lançamentos',
            books: lastReleases,
          })
        }
        onSelect={handleSelectBook}
      />

      <Categories
        categories={categoriesWithBooks}
        onSelectCategory={(category) =>
          stackNavigation.navigate(RouteName.BookList, {
            title: `${category.emoji} ${category.name}`,
            books: booksByCategory[category.id] || [],
          })
        }
      />

      {bookCollections.map(({ collection, books: collectionBooks }) => (
        <BookList
          key={collection.id}
          title={collection.name}
          books={collectionBooks}
          onSeeAll={() =>
            stackNavigation.navigate(RouteName.BookList, {
              title: collection.name,
              books: collectionBooks,
            })
          }
          onSelect={handleSelectBook}
        />
      ))}
    </PageLayout>
  );
};

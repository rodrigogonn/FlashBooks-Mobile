import { useNavigation } from '@react-navigation/native';
import { BookList } from 'components/BookList';
import { PageLayout } from 'components/PageLayout';
import { useBooksStore } from 'stores/useBooksStore';
import { useMemo } from 'react';
import { RouteName, RouteParams, StackNavigation } from 'routes/types';
import { Categories } from './components/Categories';
import { categories } from 'constants/categories';
import { Book, BookCollection } from 'stores/useBooksStore/types';
import { DateTime } from 'luxon';

export const Discover = ({}: RouteParams<RouteName.Discover>) => {
  const stackNavigation = useNavigation<StackNavigation>();
  const { books, collections } = useBooksStore();

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
      const collectionBooks = books.filter((book) =>
        collection.books.includes(book.id)
      );

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
    <PageLayout header={{ canGoBack: false }}>
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

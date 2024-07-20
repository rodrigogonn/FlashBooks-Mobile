import { useNavigation } from '@react-navigation/native';
import { BookList } from 'components/BookList';
import { PageLayout } from 'components/PageLayout';
import { Book, useBooks } from 'contexts/booksContext';
import { RouteParams, StackNavigation } from 'routes';

export const Library = ({}: RouteParams<'Library'>) => {
  const stackNavigation = useNavigation<StackNavigation>();
  const { library } = useBooks();

  const handleSelectBook = (book: Book) => {
    stackNavigation.navigate('Reading', {
      book,
    });
  };

  return (
    <PageLayout>
      <BookList
        books={library}
        title="Continuar"
        counter={3}
        withProgress
        onSelect={handleSelectBook}
      />

      <BookList
        books={library}
        title="Lidos"
        counter={5}
        small
        onSelect={handleSelectBook}
      />
    </PageLayout>
  );
};

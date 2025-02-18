import { useNavigation } from '@react-navigation/native';
import { BookComponent } from 'components/BookComponent';
import { PageLayout } from 'components/PageLayout';
import { Dimensions, View } from 'react-native';
import { RouteName, RouteParams, StackNavigation } from 'routes/types';
import { Book } from 'stores/useBooksStore/types';

const pageWidth = Dimensions.get('window').width;

export const BookList = ({
  route: {
    params: { title, books },
  },
}: RouteParams<RouteName.BookList>) => {
  const stackNavigation = useNavigation<StackNavigation>();

  const handleSelectBook = (book: Book) => {
    stackNavigation.navigate(RouteName.Reading, {
      book,
    });
  };

  return (
    <PageLayout
      header={{
        title,
      }}>
      <View
        style={{
          paddingHorizontal: 16,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 16,
        }}>
        {books.map((book) => (
          <BookComponent
            key={book.id}
            book={book}
            style={{
              flexBasis: pageWidth / 3 - 64 / 3,
            }}
            onPress={() => handleSelectBook(book)}
          />
        ))}
      </View>
    </PageLayout>
  );
};

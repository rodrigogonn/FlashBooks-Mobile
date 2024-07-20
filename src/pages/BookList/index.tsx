import { BookComponent } from 'components/BookComponent';
import { PageLayout } from 'components/PageLayout';
import { Dimensions, View } from 'react-native';
import { RouteParams } from 'routes';

const pageWidth = Dimensions.get('window').width;

export const BookList = ({
  route: {
    params: { title, books },
  },
}: RouteParams<'BookList'>) => {
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
          />
        ))}
      </View>
    </PageLayout>
  );
};

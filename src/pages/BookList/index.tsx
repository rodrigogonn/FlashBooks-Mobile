import { useNavigation } from '@react-navigation/native';
import { BookComponent } from 'components/BookComponent';
import { PageLayout } from 'components/PageLayout';
import { Dimensions, View } from 'react-native';
import { RouteName, RouteParams, StackNavigation } from 'routes/types';
import { Book } from 'providers/BooksProvider/types';

const pageWidth = Dimensions.get('window').width;
const H_PADDING = 16;
const GAP = 16;

function computeFlexBasis(columns: number): number {
  const totalGaps = GAP * (columns - 1);
  const totalPadding = H_PADDING * 2;
  const available = pageWidth - totalPadding - totalGaps;
  return Math.floor(available / columns);
}

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
        canGoBack: true,
      }}>
      <View
        style={{
          paddingHorizontal: H_PADDING,
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: GAP,
        }}>
        {books.map((book) => (
          <BookComponent
            key={book.id}
            book={book}
            options={{ withMarker: true }}
            style={{
              flexBasis: computeFlexBasis(3),
            }}
            onPress={() => handleSelectBook(book)}
          />
        ))}
      </View>
    </PageLayout>
  );
};

import { BookComponent } from 'components/BookComponent';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { Dimensions, View } from 'react-native';
import { RouteParams } from 'routes';

const pageWidth = Dimensions.get('window').width;

export const BookList = ({
  route: {
    params: { title, books },
  },
  navigation,
}: RouteParams<'BookList'>) => {
  return (
    <PageLayout>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: 16,
        }}>
        <Typography variant={TypographyVariant.Subtitle}>{title}</Typography>
      </View>

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

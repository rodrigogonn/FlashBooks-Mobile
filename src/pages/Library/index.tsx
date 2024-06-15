import { Typography, TypographyVariant } from 'components/Typography';
import { Book, useBooks } from 'contexts/booksContext';
import { useTheme } from 'contexts/themeContext';
import { Image, ScrollView, View } from 'react-native';

export const Library = () => {
  const { theme } = useTheme();
  const { library } = useBooks();

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: theme.colors.page.background,
      }}>
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 64,
          gap: 16,
        }}>
        <View
          style={{
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              paddingHorizontal: 16,
            }}>
            <Typography variant={TypographyVariant.Subtitle}>
              Continuar
            </Typography>
            <Typography
              variant={TypographyVariant.Subtitle}
              style={{
                color: theme.colors.bookList.counter,
              }}>
              3
            </Typography>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 16,
                gap: 16,
              }}>
              {library.map((book, index) => (
                <BookItem key={index} book={book} withProgress />
              ))}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 16,
              paddingHorizontal: 16,
            }}>
            <Typography variant={TypographyVariant.Subtitle}>Lidos</Typography>
            <Typography
              variant={TypographyVariant.Subtitle}
              style={{
                color: theme.colors.bookList.counter,
              }}>
              5
            </Typography>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 16,
                gap: 16,
              }}>
              {library.map((book, index) => (
                <BookItem key={index} book={book} small />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

interface BookItemProps {
  book: Book;
  withProgress?: boolean;
  small?: boolean;
}
export const BookItem = ({
  book,
  withProgress = false,
  small = false,
}: BookItemProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        width: 155 * (small ? 0.6 : 1),
      }}>
      <View
        style={{
          position: 'relative',
          height: 230 * (small ? 0.6 : 1),
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        <Image
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
          }}
          src={book.imageSrc}
        />
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: 1,
            left: '2.5%',
            backgroundColor: 'rgba(150, 150, 150, 0.2)',
            borderRadius: 8,
          }}
        />
      </View>

      {withProgress && (
        <View
          style={{
            marginTop: 6,
            width: '100%',
            height: 6,
            backgroundColor: theme.colors.common.progress.background,
            borderRadius: 3,
            overflow: 'hidden',
          }}>
          <View
            style={{
              width: `${
                (((book.lastReadPage || 1) - 1 + 0.1) / book.pages.length) * 100
              }%`,
              height: '100%',
              backgroundColor: theme.colors.common.progress.fill,
            }}
          />
        </View>
      )}

      <Typography variant={TypographyVariant.BookListTitle} numberOfLines={1}>
        {book.title}
      </Typography>
    </View>
  );
};

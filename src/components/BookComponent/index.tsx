import { Typography, TypographyVariant } from 'components/Typography';
import { Book } from 'contexts/booksContext';
import { useTheme } from 'contexts/themeContext';
import { Image, TouchableOpacity, View, ViewStyle } from 'react-native';

export interface BookComponentProps {
  book: Book;
  withProgress?: boolean;
  small?: boolean;
  style?: ViewStyle;
  onPress?: () => void;
}
export const BookComponent = ({
  book,
  withProgress = false,
  small = false,
  style,
  onPress,
}: BookComponentProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 155 * (small ? 0.6 : 1),
        ...style,
      }}>
      <View
        style={{
          width: '100%',
          position: 'relative',
          aspectRatio: 160 / 230,
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
    </TouchableOpacity>
  );
};

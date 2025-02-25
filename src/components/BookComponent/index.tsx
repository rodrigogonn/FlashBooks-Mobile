import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import { useMemo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { Book } from 'providers/BooksProvider/types';
import FastImage from 'react-native-fast-image';

export interface BookComponentProps {
  book: Book;
  style?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
  options?: {
    withTitle?: boolean;
    withProgress?: boolean;
    size?: 'small' | 'medium' | 'large';
  };
}
export const BookComponent = ({
  book,
  options,
  style,
  onPress,
  onLongPress,
}: BookComponentProps) => {
  const {
    withProgress = false,
    size = 'medium',
    withTitle = true,
  } = options || {};

  const { theme } = useTheme();
  const progress = useMemo(() => {
    if (book.finished) return 1;
    return (book.lastReadPageIndex || 0) / book.chapters.length;
  }, [book]);

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        width: 155 * (size === 'small' ? 0.6 : size === 'large' ? 1.4 : 1),
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
        <FastImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={{
            uri: book.imageUrl,
            priority: FastImage.priority.normal,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View
          // eslint-disable-next-line react-native/no-color-literals
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
              width: `${(progress + 0.05) * 100}%`,
              height: '100%',
              backgroundColor: theme.colors.common.progress.fill,
            }}
          />
        </View>
      )}

      {withTitle && (
        <Typography variant={TypographyVariant.BookListTitle} numberOfLines={1}>
          {book.title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

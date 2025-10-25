import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import { memo, useMemo } from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Book } from 'providers/BooksProvider/types';
import { CachedImage } from 'components/CachedImage';

export interface BookComponentProps {
  book: Book;
  style?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
  options?: {
    withTitle?: boolean;
    withProgress?: boolean;
    size?: 'small' | 'medium' | 'large';
    withMarker?: boolean;
  };
}
const BookComponentComponent = ({
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
    withMarker = false,
  } = options || {};

  const { theme } = useTheme();
  const progress = useMemo(() => {
    if (book.finished) return 1;
    return (book.lastReadPageIndex || 0) / book.chapters.length;
  }, [book]);

  const readingStatus = useMemo(() => {
    if (book.finished) return 'finished' as const;
    if ((book.lastReadPageIndex || 0) > 0 || !!book.lastReadAt)
      return 'in_progress' as const;
    return 'not_started' as const;
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
        <CachedImage
          style={{
            height: '100%',
            width: '100%',
          }}
          source={{ uri: book.imageUrl }}
          resizeMode="cover"
        />
        {withMarker && readingStatus !== 'not_started' && (
          <View
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              height: 32,
              width: 32,
              borderRadius: 16,
              borderWidth: 1,
              borderColor: theme.colors.card.border,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: theme.colors.card.background,
                opacity: 0.7,
              }}
            />
            {readingStatus === 'finished' ? (
              <MaterialIcons
                name="star"
                size={24}
                color={theme.colors.common.accent}
              />
            ) : (
              <MaterialIcons
                name="bookmark-border"
                size={24}
                color={theme.colors.common.icon.normal}
              />
            )}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            height: '100%',
            width: 1,
            left: '2.5%',
            backgroundColor: theme.colors.card.border,
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

function arePropsEqual(prev: BookComponentProps, next: BookComponentProps) {
  if (prev.book === next.book && prev.style === next.style) {
    // shallow compare of options fields used
    const p = prev.options || {};
    const n = next.options || {};
    return (
      p.withProgress === n.withProgress &&
      p.size === n.size &&
      p.withTitle === n.withTitle &&
      prev.onPress === next.onPress &&
      prev.onLongPress === next.onLongPress
    );
  }
  return false;
}

export const BookComponent = memo(BookComponentComponent, arePropsEqual);

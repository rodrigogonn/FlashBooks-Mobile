import { BookComponent } from 'components/BookComponent';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useCallback, useMemo } from 'react';
import { Book } from 'providers/BooksProvider/types';

interface BookListProps {
  title: string;
  counter?: number;
  books: Book[];
  onSeeAll?: () => void;
  withProgress?: boolean;
  small?: boolean;
  onSelect?: (book: Book) => void;
  onLongPress?: (book: Book) => void;
  withMarker?: boolean;
}

export const BookList = ({
  title,
  counter,
  books,
  onSeeAll,
  withProgress,
  small,
  onSelect,
  onLongPress,
  withMarker,
}: BookListProps) => {
  const { theme } = useTheme();
  const itemBaseWidth = useMemo(() => (small ? 155 * 0.6 : 155), [small]);

  const keyExtractor = useCallback((item: Book) => String(item.id), []);
  const optionsMemo = useMemo(
    () => ({
      size: (small ? 'small' : 'medium') as 'small' | 'medium',
      withProgress,
      withMarker,
    }),
    [small, withProgress, withMarker]
  );

  const renderItem = useCallback(
    ({ item }: { item: Book }) => (
      <BookComponent
        book={item}
        options={optionsMemo}
        onPress={() => onSelect?.(item)}
        onLongPress={onLongPress ? () => onLongPress(item) : undefined}
      />
    ),
    [onLongPress, onSelect, optionsMemo]
  );

  return (
    <View
      style={{
        gap: 16,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingHorizontal: 16,
        }}>
        <View
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            gap: 16,
          }}>
          <Typography variant={TypographyVariant.Subtitle}>{title}</Typography>
          {counter && (
            <Typography
              variant={TypographyVariant.Subtitle}
              style={{
                color: theme.colors.bookList.counter,
              }}>
              {counter}
            </Typography>
          )}
        </View>

        {onSeeAll && (
          <TouchableOpacity
            onPress={onSeeAll}
            style={{
              paddingHorizontal: 8,
              paddingVertical: 8,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.card.background,
              borderWidth: 1,
              borderColor: theme.colors.card.border,
              borderRadius: 8,
              gap: 8,
            }}>
            <Typography
              variant={TypographyVariant.Body}
              style={{
                fontSize: 10,
              }}>
              Ver todos
            </Typography>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        horizontal
        data={books}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        removeClippedSubviews
        windowSize={5}
        maxToRenderPerBatch={8}
        updateCellsBatchingPeriod={50}
        initialNumToRender={6}
        getItemLayout={(_, index) => ({
          length: itemBaseWidth + 16,
          offset: (itemBaseWidth + 16) * index + 16,
          index,
        })}
        nestedScrollEnabled
      />
    </View>
  );
};

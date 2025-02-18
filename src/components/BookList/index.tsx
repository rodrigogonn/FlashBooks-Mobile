import { BookComponent } from 'components/BookComponent';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Book } from 'stores/useBooksStore/types';

interface BookListProps {
  title: string;
  counter?: number;
  books: Book[];
  onSeeAll?: () => void;
  withProgress?: boolean;
  small?: boolean;
  onSelect?: (book: Book) => void;
  onLongPress?: (book: Book) => void;
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
}: BookListProps) => {
  const { theme } = useTheme();

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            paddingHorizontal: 16,
            gap: 16,
          }}>
          {books.map((book) => (
            <BookComponent
              key={book.id}
              book={book}
              small={small}
              withProgress={withProgress}
              onPress={() => onSelect?.(book)}
              onLongPress={onLongPress ? () => onLongPress(book) : undefined}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

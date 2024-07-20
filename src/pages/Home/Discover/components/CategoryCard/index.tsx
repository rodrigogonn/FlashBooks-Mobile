import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'contexts/themeContext';
import { Text, TouchableOpacity } from 'react-native';
import { Category } from 'types/category.interface';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard = ({ category, onPress }: CategoryCardProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
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
      <Text
        style={{
          fontSize: 32,
        }}>
        {category.emoji}
      </Text>

      <Typography variant={TypographyVariant.Body}>{category.name}</Typography>
    </TouchableOpacity>
  );
};

import { Typography, TypographyVariant } from 'components/Typography';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Category } from 'types/category.interface';
import { CategoryCard } from '../CategoryCard';

interface CategoriesProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}
export const Categories = ({
  categories,
  onSelectCategory,
}: CategoriesProps) => {
  const { halfCategories, otherHalfCategories } = useMemo(() => {
    const halfCategories = categories.slice(
      0,
      Math.ceil(categories.length / 2)
    );
    const otherHalfCategories = categories.slice(
      Math.ceil(categories.length / 2)
    );

    return { halfCategories, otherHalfCategories };
  }, [categories]);

  return (
    <View
      style={{
        gap: 16,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingHorizontal: 16,
        }}>
        <Typography variant={TypographyVariant.Subtitle}>Categorias</Typography>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={{
            display: 'flex',
            gap: 16,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 16,
              gap: 16,
            }}>
            {halfCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => onSelectCategory(category)}
              />
            ))}
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingHorizontal: 16,
              gap: 16,
            }}>
            {otherHalfCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => onSelectCategory(category)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

import { categories } from 'constants/categories';
import { Category } from 'types/category.interface';

export const categoriesFromIds = (ids: number[]): Category[] => {
  return categories.filter((category) => ids.includes(category.id));
};

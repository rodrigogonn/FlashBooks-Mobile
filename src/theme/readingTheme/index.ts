import { ReadingTheme, ReadingThemeName } from 'theme/types';
import { readingTheme as dark } from './dark';
import { readingTheme as light } from './light';
import { readingTheme as sepia } from './sepia';

export const readingThemes: Record<ReadingThemeName, ReadingTheme> = {
  [ReadingThemeName.Light]: light,
  [ReadingThemeName.Dark]: dark,
  [ReadingThemeName.Sepia]: sepia,
};

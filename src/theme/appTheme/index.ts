import { Theme, ThemeName } from 'theme/types';
import { theme as light } from './light';
import { theme as dark } from './dark';

export const themes: Record<ThemeName, Theme> = {
  [ThemeName.Light]: light,
  [ThemeName.Dark]: dark,
};

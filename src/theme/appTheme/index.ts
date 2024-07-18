import { Theme, ThemeName } from 'theme/types';
import { theme as main } from './main';

export const themes: Record<ThemeName, Theme> = {
  [ThemeName.Main]: main,
};

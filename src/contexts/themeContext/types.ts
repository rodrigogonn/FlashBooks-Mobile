import { ReadingTheme, ReadingThemeName, Theme, ThemeName } from 'theme/types';

export interface ThemeContextData {
  theme: Theme & { name: ThemeName };
  readingTheme: ReadingTheme & { name: ReadingThemeName };
  changeTheme: (name: ThemeName) => void;
  changeReadingTheme: (name: ReadingThemeName) => void;
}

import { useMemo } from 'react';
import { themes } from 'theme/appTheme';
import { readingThemes } from 'theme/readingTheme';
import { useThemeStore } from 'stores/useThemeStore';

export const useTheme = () => {
  const { themeName, readingThemeName, changeTheme, changeReadingTheme } =
    useThemeStore();

  const theme = useMemo(() => {
    return {
      ...themes[themeName],
      name: themeName,
    };
  }, [themeName]);

  const readingTheme = useMemo(() => {
    return {
      ...readingThemes[readingThemeName],
      name: readingThemeName,
    };
  }, [readingThemeName]);

  return { theme, readingTheme, changeTheme, changeReadingTheme };
};

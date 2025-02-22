import { useContext, useMemo } from 'react';
import { themes } from 'theme/appTheme';
import { readingThemes } from 'theme/readingTheme';
import { ThemeContext } from 'providers/ThemeProvider';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro do ThemeProvider');
  }

  const { themeName, readingThemeName, changeTheme, changeReadingTheme } =
    context;

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

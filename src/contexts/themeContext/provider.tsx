import { useState } from 'react';
import { themes } from 'theme/appTheme';
import { readingThemes } from 'theme/readingTheme';
import { ReadingThemeName, ThemeName } from 'theme/types';
import { ThemeContext } from './context';

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  // @TODO salvar no localstorage
  const [themeName, setThemeName] = useState<ThemeName>(ThemeName.Dark);
  const [readingThemeName, setReadingThemeName] = useState<ReadingThemeName>(
    ReadingThemeName.Dark
  );

  const changeTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  const changeReadingTheme = (name: ReadingThemeName) => {
    setReadingThemeName(name);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: { ...themes[themeName], name: themeName },
        readingTheme: {
          ...readingThemes[readingThemeName],
          name: readingThemeName,
        },
        changeTheme,
        changeReadingTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

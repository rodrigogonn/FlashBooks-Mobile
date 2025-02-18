import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReadingThemeName, ThemeName } from 'theme/types';

interface ThemeState {
  themeName: ThemeName;
  readingThemeName: ReadingThemeName;
  changeTheme: (name: ThemeName) => void;
  changeReadingTheme: (name: ReadingThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeName: ThemeName.Dark,
      readingThemeName: ReadingThemeName.Dark,

      changeTheme: (name: ThemeName) => set({ themeName: name }),
      changeReadingTheme: (name: ReadingThemeName) =>
        set({ readingThemeName: name }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

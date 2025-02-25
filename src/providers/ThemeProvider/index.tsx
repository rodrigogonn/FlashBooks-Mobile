import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { createUserSpecificStorage } from 'utils/userStorageAdapter';
import { ReadingThemeName, ThemeName } from 'theme/types';
import { useAuthStore } from 'stores/useAuthStore';

interface ThemeState {
  themeName: ThemeName;
  readingThemeName: ReadingThemeName;
}

interface ThemeContextType extends ThemeState {
  changeTheme: (name: ThemeName) => void;
  changeReadingTheme: (name: ReadingThemeName) => void;
}

type ThemeAction =
  | { type: 'CHANGE_THEME'; payload: { name: ThemeName } }
  | { type: 'CHANGE_READING_THEME'; payload: { name: ReadingThemeName } }
  | { type: 'LOAD_PERSISTED_DATA'; payload: ThemeState };

export const ThemeContext = createContext<ThemeContextType | null>(null);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        themeName: action.payload.name,
      };

    case 'CHANGE_READING_THEME':
      return {
        ...state,
        readingThemeName: action.payload.name,
      };

    case 'LOAD_PERSISTED_DATA':
      return action.payload;

    default:
      return state;
  }
}

const initialState: ThemeState = {
  themeName: ThemeName.Dark,
  readingThemeName: ReadingThemeName.Dark,
};

const themeStoreKey = 'theme-storage';
const lastUsedThemeKey = 'last-used-theme';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);
  const { user } = useAuthStore();

  const storage = useMemo(() => {
    return createUserSpecificStorage(user?.id || 'default');
  }, [user]);
  const defaultStorage = useMemo(() => {
    return createUserSpecificStorage('default');
  }, []);

  const loadPersistedData = useCallback(async () => {
    try {
      let persistedData;
      if (user) {
        persistedData = await storage.getItem(themeStoreKey);
      } else {
        persistedData = await defaultStorage.getItem(lastUsedThemeKey);
      }

      if (persistedData) {
        const parsedData = JSON.parse(persistedData);
        const loadedState = {
          ...initialState,
          ...parsedData,
        };
        dispatch({
          type: 'LOAD_PERSISTED_DATA',
          payload: loadedState,
        });
      }
    } catch (error) {
      console.error('Error loading persisted theme data:', error);
    }
  }, [defaultStorage, storage, user]);

  const persistData = useCallback(
    async (data: ThemeState) => {
      try {
        if (user) {
          await storage.setItem(themeStoreKey, JSON.stringify(data));
        }

        await defaultStorage.setItem(lastUsedThemeKey, JSON.stringify(data));
      } catch (error) {
        console.error('Error persisting theme data:', error);
      }
    },
    [storage, user, defaultStorage]
  );

  useEffect(() => {
    loadPersistedData();
  }, [loadPersistedData, user?.id]);

  useEffect(() => {
    persistData(state);
  }, [state, persistData]);

  const changeTheme = useCallback((name: ThemeName) => {
    dispatch({ type: 'CHANGE_THEME', payload: { name } });
  }, []);

  const changeReadingTheme = useCallback((name: ReadingThemeName) => {
    dispatch({ type: 'CHANGE_READING_THEME', payload: { name } });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        ...state,
        changeTheme,
        changeReadingTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

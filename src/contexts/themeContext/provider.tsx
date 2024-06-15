import { theme } from 'theme';
import { ThemeContext } from './context';

export const ThemeProvider = ({ children }: { children?: React.ReactNode }) => {
  return (
    <ThemeContext.Provider
      value={{
        theme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

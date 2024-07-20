import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from '@expo-google-fonts/comfortaa';
import { BooksProvider } from 'contexts/booksContext';
import { ReadingProvider } from 'contexts/readingContext/provider';
import { ThemeProvider } from 'contexts/themeContext';
import { StatusBar } from 'expo-status-bar';
import { Routes } from 'routes';

const App = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider>
        <BooksProvider>
          <ReadingProvider>
            <Routes />
          </ReadingProvider>
        </BooksProvider>
      </ThemeProvider>

      <StatusBar style="auto" />
    </>
  );
};

export default App;

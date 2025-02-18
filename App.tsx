import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from '@expo-google-fonts/comfortaa';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { Routes } from 'routes';
import { ThemeName } from 'theme/types';

const App = () => {
  let [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });
  const { theme } = useTheme();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Routes />

      <StatusBar style={theme.name === ThemeName.Dark ? 'light' : 'dark'} />
    </>
  );
};

export default App;

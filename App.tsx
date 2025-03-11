import {
  Comfortaa_300Light,
  Comfortaa_400Regular,
  Comfortaa_700Bold,
  useFonts,
} from '@expo-google-fonts/comfortaa';
import { ThemeProvider } from 'providers/ThemeProvider';
import React from 'react';
import { Routes } from 'routes';
import { withIAPContext } from 'react-native-iap';
import { IAPListenerProvider } from 'providers/IAPListenerProvider';

const App = () => {
  const [fontsLoaded] = useFonts({
    Comfortaa_300Light,
    Comfortaa_400Regular,
    Comfortaa_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <IAPListenerProvider>
      <ThemeProvider>
        <Routes />
      </ThemeProvider>
    </IAPListenerProvider>
  );
};

export default withIAPContext(App);

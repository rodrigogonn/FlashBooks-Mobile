import { comfortaa } from 'theme/fonts';
import { ReadingTheme } from 'theme/types';

export const readingTheme: ReadingTheme = {
  fontFamily: comfortaa,
  colors: {
    background: '#121212',
    title: '#ffffff',
    text: '#e0e0e0',
    button: {
      primary: {
        background: '#1e88e5',
        color: '#ffffff',
      },
    },
    navigationButton: {
      background: '#333333',
    },
    progress: {
      background: '#444444',
      fill: '#1e88e5',
    },
  },
};

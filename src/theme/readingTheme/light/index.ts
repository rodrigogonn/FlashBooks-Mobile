import { comfortaa } from 'theme/fonts';
import { ReadingTheme } from 'theme/types';

export const readingTheme: ReadingTheme = {
  fontFamily: comfortaa,
  colors: {
    background: '#fdfdfd',
    title: '#333333',
    text: '#333333',
    button: {
      primary: {
        background: '#007bff',
        color: '#ffffff',
      },
    },
    navigationButton: {
      background: '#e0e0e0',
    },
    progress: {
      background: '#cccccc',
      fill: '#007bff',
    },
  },
};

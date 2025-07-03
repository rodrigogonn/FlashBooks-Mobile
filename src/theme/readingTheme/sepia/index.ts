import { comfortaa } from 'theme/fonts';
import { ReadingTheme } from 'theme/types';

export const readingTheme: ReadingTheme = {
  fontFamily: comfortaa,
  colors: {
    background: '#f4ecd8',
    title: '#5b4636',
    text: '#5b4636',
    button: {
      primary: {
        background: '#8d6e63',
        color: '#ffffff',
      },
    },
    navigationButton: {
      background: '#e0c9a6',
    },
    progress: {
      background: '#d1b497',
      fill: '#8d6e63',
    },
    keyPoint: {
      accent: '#8d6e63',
    },
  },
};

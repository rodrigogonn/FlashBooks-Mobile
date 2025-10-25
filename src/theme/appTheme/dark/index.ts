import { comfortaa } from 'theme/fonts';
import { Theme } from 'theme/types';

export const theme: Theme = {
  fontFamily: comfortaa,
  colors: {
    page: {
      background: '#121212',
      title: '#ffffff',
      text: '#bbbbbb',
    },
    bookList: {
      text: '#bbbbbb',
      counter: '#777777',
    },
    card: {
      background: '#1e1e1e',
      border: '#333333',
    },
    button: {
      primary: {
        background: '#1a73e8',
        color: '#ffffff',
      },
      ghost: {
        background: '#1e1e1e',
        color: '#ffffff',
      },
      icon: '#555555',
    },
    common: {
      progress: {
        background: '#333333',
        fill: '#1a73e8',
      },
      icon: {
        normal: '#888888',
        active: '#1a73e8',
        inactive: '#555555',
      },
      border: {
        normal: '#333333',
      },
      accent: '#facc15',
    },
    modal: {
      backdrop: 'rgba(0, 0, 0, 0.7)',
    },
    text: {
      primary: '#ffffff',
      error: '#ff0000',
    },
  },
};

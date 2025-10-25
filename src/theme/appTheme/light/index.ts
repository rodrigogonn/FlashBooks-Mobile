import { comfortaa } from 'theme/fonts';
import { Theme } from 'theme/types';

export const theme: Theme = {
  fontFamily: comfortaa,
  colors: {
    page: {
      background: '#ffffff',
      title: '#333333',
      text: '#555555',
    },
    card: {
      background: '#ffffff',
      border: '#e0e0e0',
    },
    button: {
      primary: {
        background: '#007bff',
        color: '#ffffff',
      },
      ghost: {
        background: '#ffffff',
        color: '#333333',
      },
      icon: '#e0e0e0',
    },
    bookList: {
      text: '#555555',
      counter: '#bbbbbb',
    },
    common: {
      progress: {
        background: '#cccccc',
        fill: '#007bff',
      },
      icon: {
        normal: '#999999',
        active: '#007bff',
        inactive: '#cccccc',
      },
      border: {
        normal: '#e0e0e0',
      },
      accent: '#facc15',
    },
    modal: {
      backdrop: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#333333',
      error: '#ff0000',
    },
  },
};

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
    bookList: {
      text: '#555555',
      counter: '#bbbbbb',
    },
    card: {
      background: '#ffffff',
      border: '#e0e0e0',
    },
    button: {
      icon: '#e0e0e0',
    },
    common: {
      progress: {
        background: '#cccccc',
        fill: '#007bff',
      },
    },
    modal: {
      backdrop: 'rgba(0, 0, 0, 0.5)',
    },
    text: {
      primary: '#333333',
    },
  },
};

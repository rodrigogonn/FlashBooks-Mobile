import { Theme } from 'contexts/themeContext';
import { comfortaa } from './fonts';

export const theme: Theme = {
  fontFamily: comfortaa,
  colors: {
    reading: {
      background: '#f5f5f5',
      title: '#000000',
      text: '#000000',
      navigationButton: {
        background: '#ddd',
      },
      progress: {
        background: '#aaa',
        fill: '#005eff',
      },
    },
    page: {
      background: '#f5f5f5',
      title: '#000000',
      text: '#000000',
    },
    bookList: {
      text: '#444',
      counter: '#aaa',
    },
    common: {
      progress: {
        background: '#aaa',
        fill: '#005eff',
      },
    },
  },
};

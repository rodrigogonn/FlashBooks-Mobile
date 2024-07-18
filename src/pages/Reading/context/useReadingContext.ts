import { useContext } from 'react';
import { ReadingContext } from './Context';

export const useReadingContext = () => {
  return useContext(ReadingContext);
};

import { useContext } from 'react';
import { ReadingContext } from './context';

export const useReading = () => {
  return useContext(ReadingContext);
};

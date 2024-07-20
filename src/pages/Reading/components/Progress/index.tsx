import { useReading } from 'contexts/readingContext/useReading';
import { useTheme } from 'contexts/themeContext';
import { useMemo } from 'react';
import { View } from 'react-native';

export const Progress = () => {
  const { currentPageIndex, book } = useReading();
  const { readingTheme } = useTheme();
  const percentage = useMemo(() => {
    if (!book) return 0;
    return (currentPageIndex + 0.1) / book.pages.length;
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: 6,
        position: 'absolute',
        bottom: 0,
        backgroundColor: readingTheme.colors.progress.background,
      }}>
      <View
        style={{
          width: `${percentage * 100}%`,
          height: '100%',
          backgroundColor: readingTheme.colors.progress.fill,
        }}
      />
    </View>
  );
};

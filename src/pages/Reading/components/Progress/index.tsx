import { useReading } from 'hooks/useReading';
import { useReadingProgressStore } from 'stores/useReadingProgressStore';
import { useTheme } from 'hooks/useTheme';
import { useMemo } from 'react';
import { View } from 'react-native';

export const Progress = () => {
  const { book, completed } = useReading();
  const currentPageIndex = useReadingProgressStore((s) => s.currentPageIndex);
  const { readingTheme } = useTheme();
  const percentage = useMemo(() => {
    if (!book) return 0;
    if (completed) return 1;
    return (currentPageIndex || 0) / book.chapters.length;
  }, [book, completed, currentPageIndex]);

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
          width: `${(percentage + 0.05) * 100}%`,
          height: '100%',
          backgroundColor: readingTheme.colors.progress.fill,
        }}
      />
    </View>
  );
};

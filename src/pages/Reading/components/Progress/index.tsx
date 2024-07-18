import { useTheme } from 'contexts/themeContext';
import { useReadingContext } from 'pages/Reading/context/useReadingContext';
import { View } from 'react-native';

export const Progress = () => {
  const { currentPageIndex, book } = useReadingContext();
  const { readingTheme } = useTheme();
  const percentage = (currentPageIndex + 0.1) / book.pages.length;

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

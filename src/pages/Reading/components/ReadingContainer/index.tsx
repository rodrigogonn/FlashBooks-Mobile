import { useTheme } from 'hooks/useTheme';
import { View } from 'react-native';
import { ReadingAdjustments } from '../ReadingAdjustments';
import { ReadingHeader } from '../ReadingHeader';

interface ReadingContainerProps {
  children?: React.ReactNode;
  adjustmentsEnabled?: boolean;
}
export const ReadingContainer = ({ children }: ReadingContainerProps) => {
  const { readingTheme } = useTheme();

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: readingTheme.colors.background,
      }}>
      <ReadingHeader />

      <View
        style={{
          flex: 1,
        }}>
        {children}
      </View>

      <ReadingAdjustments />
    </View>
  );
};

import { useTheme } from 'contexts/themeContext';
import { ScrollView, View } from 'react-native';

interface PageLayoutProps {
  children?: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: theme.colors.page.background,
      }}>
      <View
        style={{
          paddingTop: 16,
          paddingBottom: 64,
          gap: 16,
        }}>
        {children}
      </View>
    </ScrollView>
  );
};

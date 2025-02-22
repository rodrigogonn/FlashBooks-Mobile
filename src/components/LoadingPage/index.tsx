import { ActivityIndicator, View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { PageLayout } from 'components/PageLayout';

export const LoadingPage = () => {
  const { theme } = useTheme();

  return (
    <PageLayout>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={theme.colors.text.primary} />
      </View>
    </PageLayout>
  );
};

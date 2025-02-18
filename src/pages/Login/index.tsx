import { Button } from 'components/Button';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { useState } from 'react';
import { View } from 'react-native';
import { RouteName, RouteParams } from 'routes/types';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'hooks/useTheme';
import { useAuthStore } from 'stores/useAuthStore';

export const Login = ({}: RouteParams<RouteName.Login>) => {
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google', error);
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <View
        style={{
          display: 'flex',
          paddingHorizontal: 16,
          gap: 16,
          flexGrow: 1,
        }}>
        <Typography variant={TypographyVariant.Title}>Bem-vindo</Typography>
        <Typography variant={TypographyVariant.Body}>
          Entre com sua conta para continuar
        </Typography>
        <Button
          onPress={handleLogin}
          disabled={loading}
          style={{ marginTop: 'auto' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            <AntDesign
              name="google"
              size={24}
              color={theme.colors.button.primary.color}
            />
            <Typography variant={TypographyVariant.Button}>
              {loading ? 'Carregando...' : 'Entre com Google'}
            </Typography>
          </View>
        </Button>
      </View>
    </PageLayout>
  );
};

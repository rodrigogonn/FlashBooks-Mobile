import { Button } from 'components/Button';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { useAuth } from 'contexts/authContext';
import { useState } from 'react';
import { RouteName, RouteParams } from 'routes/types';

export const Login = ({}: RouteParams<RouteName.Login>) => {
  const { loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

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
      <Button onPress={handleLogin} disabled={loading}>
        <Typography variant={TypographyVariant.Button}>
          {loading ? 'Carregando...' : 'Login'}
        </Typography>
      </Button>
    </PageLayout>
  );
};

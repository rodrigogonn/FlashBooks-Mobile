import { View } from 'react-native';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { Button } from 'components/Button';

export const ErrorPage = ({ onRetry }: { onRetry?: () => void }) => {
  return (
    <PageLayout>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}>
        <Typography variant={TypographyVariant.Title}>
          Ops! Algo deu errado
        </Typography>
        {onRetry && (
          <Button onPress={onRetry}>
            <Typography variant={TypographyVariant.Button}>
              Tentar novamente
            </Typography>
          </Button>
        )}
      </View>
    </PageLayout>
  );
};

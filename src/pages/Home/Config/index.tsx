import React from 'react';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import { View, Image } from 'react-native';
import { RouteName, RouteParams } from 'routes/types';
import { useAuthStore } from 'stores/useAuthStore';
import { ThemeName } from 'theme/types';
import { MaterialIcons } from '@expo/vector-icons';
import { DateTime } from 'luxon';
import { Button } from 'components/Button';
import { useSubscription } from 'hooks/useSubscription';

export const Config = ({ route }: RouteParams<RouteName.Config>) => {
  const { subscription } = useSubscription();
  const { theme, changeTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleThemeToggle = () => {
    changeTheme(
      theme.name === ThemeName.Dark ? ThemeName.Light : ThemeName.Dark
    );
  };

  return (
    <PageLayout header={{ title: route.name }}>
      <View style={{ padding: 16, gap: 24 }}>
        {/* Perfil do Usuário */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Image
            source={{ uri: user?.photo }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: theme.colors.card.background,
            }}
          />
          <Typography
            variant={TypographyVariant.Title}
            style={{
              textAlign: 'center',
            }}>
            {user?.name}
          </Typography>
          <Typography
            variant={TypographyVariant.Body}
            style={{ color: theme.colors.page.text, textAlign: 'center' }}>
            {user?.email}
          </Typography>
        </View>

        {/* Informações da Assinatura */}
        {!!subscription && (
          <View
            style={{
              backgroundColor: theme.colors.card.background,
              padding: 16,
              borderRadius: 8,
              gap: 8,
            }}>
            <Typography variant={TypographyVariant.Subtitle}>
              Informações da Assinatura
            </Typography>

            <Typography variant={TypographyVariant.Body}>
              Status: Ativa
            </Typography>
            <Typography variant={TypographyVariant.Body}>
              Expira em:{' '}
              {DateTime.fromISO(subscription.expiryTime).toFormat('dd/MM/yyyy')}
            </Typography>
          </View>
        )}

        {/* Configurações de Tema */}
        <Button
          variant="ghost"
          onPress={handleThemeToggle}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 8,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              flex: 1,
            }}>
            <MaterialIcons
              name={theme.name === ThemeName.Dark ? 'light-mode' : 'dark-mode'}
              size={24}
              color={theme.colors.button.ghost.color}
            />
            <Typography variant={TypographyVariant.ButtonGhost}>
              Tema {theme.name === ThemeName.Dark ? 'Claro' : 'Escuro'}
            </Typography>
          </View>
        </Button>

        {/* Botão de Logout */}
        <Button
          variant="ghost"
          onPress={logout}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            gap: 8,
          }}>
          <MaterialIcons
            name="logout"
            size={24}
            color={theme.colors.button.ghost.color}
          />
          <Typography variant={TypographyVariant.ButtonGhost}>Sair</Typography>
        </Button>
      </View>
    </PageLayout>
  );
};

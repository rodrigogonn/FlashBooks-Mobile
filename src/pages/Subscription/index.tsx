import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { View } from 'react-native';
import { RouteName, RouteParams } from 'routes/types';

export const Subscription = ({
  route,
}: RouteParams<RouteName.Subscription>) => {
  // const { theme } = useTheme();

  const handleSubscribe = (plan: string) => {
    console.log(`Assinatura escolhida: ${plan}`);
    // Implementar lógica de assinatura do plano aqui
  };

  // const handleGoogleSubscription = async () => {
  //   try {
  //     console.log('Assinar pelo Google');
  //     // Implementar lógica de assinatura pelo Google aqui
  //     // Alterar o subscription localmente aqui com base na resposta
  //   } catch (error) {
  //     console.error('Erro ao assinar com Google', error);
  //   }
  // };

  return (
    <PageLayout header={{ title: route.name }}>
      <View
        style={{
          display: 'flex',
          paddingHorizontal: 16,
          gap: 16,
          flexGrow: 1,
        }}>
        <Typography variant={TypographyVariant.Title}>
          Escolha seu Plano de Assinatura
        </Typography>
        <Typography variant={TypographyVariant.Body}>
          Selecione o melhor plano para você e comece a aproveitar todos os
          benefícios
        </Typography>

        <View
          style={{
            marginTop: 'auto',
            display: 'flex',
            gap: 16,
          }}>
          <PlanCard
            title="Plano Mensal"
            months={1}
            discountedPrice={14.9}
            monthlyPrice={14.9}
            onPress={() => handleSubscribe('mensal')}
            isSelected={false}
          />

          <PlanCard
            title="Plano Trimestral"
            months={3}
            discountedPrice={33.53}
            monthlyPrice={14.9}
            onPress={() => handleSubscribe('trimestral')}
            isSelected={false}
          />

          <PlanCard
            title="Plano Anual"
            months={12}
            discountedPrice={89.4}
            monthlyPrice={14.9}
            onPress={() => handleSubscribe('anual')}
            isSelected={true}
          />
        </View>

        <Button
          // onPress={handleLogin}
          // disabled={loading}
          style={{ marginTop: 'auto' }}>
          <Typography variant={TypographyVariant.Button}>Assinar</Typography>
        </Button>
      </View>
    </PageLayout>
  );
};

import { TouchableOpacity } from 'react-native';
import { Button } from 'components/Button';

const PlanCard = ({
  title,
  onPress,
  months,
  discountedPrice,
  monthlyPrice,
  isSelected,
}: {
  title: string;
  onPress: () => void;
  months: number;
  discountedPrice: number;
  monthlyPrice: number;
  isSelected: boolean;
}) => {
  const { theme } = useTheme();

  const originalPrice = monthlyPrice * months;
  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        backgroundColor: theme.colors.card.background,
        padding: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: isSelected
          ? theme.colors.button.primary.background
          : theme.colors.card.border,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        gap: 8,
      }}>
      {discountPercentage > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -1,
            right: -1,
            backgroundColor: isSelected
              ? theme.colors.button.primary.background
              : theme.colors.card.border,
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderBottomLeftRadius: 4,
          }}>
          <Typography
            variant={TypographyVariant.Small}
            style={{
              color: isSelected
                ? theme.colors.button.primary.color
                : theme.colors.text.primary,
            }}>
            Economize {discountPercentage.toFixed(0)}%!
          </Typography>
        </View>
      )}

      <View style={{ flex: 1, gap: 4 }}>
        <Typography variant={TypographyVariant.Subtitle}>{title}</Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {discountPercentage > 0 ? (
            <>
              <Typography
                variant={TypographyVariant.Body}
                style={{
                  textDecorationLine: 'line-through',
                }}>
                R$ {originalPrice.toFixed(2)}
              </Typography>
              <Typography
                variant={TypographyVariant.Body}
                style={{ color: theme.colors.button.primary.background }}>
                R$ {discountedPrice.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant={TypographyVariant.Body}>
              R$ {discountedPrice.toFixed(2)}
            </Typography>
          )}
        </View>
      </View>

      <Typography
        variant={TypographyVariant.Body}
        style={{ color: theme.colors.text.primary }}>
        R$ {(discountedPrice / months).toFixed(2)}/mês
      </Typography>
    </TouchableOpacity>
  );
};

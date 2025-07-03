import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { RouteName, RouteParams } from 'routes/types';
import { TouchableOpacity } from 'react-native';
import { Button } from 'components/Button';
import {
  SubscriptionOfferAndroid,
  SubscriptionPlatform,
  useIAP,
} from 'react-native-iap';

const premiumSubscriptionSku = 'com.flashbooks.assinatura.premium';

enum PlanId {
  Monthly = 'comflashbooks-assinatura-premium-mensal',
  Trimestral = 'comflashbooks-assinatura-premium-trimestral',
  Annual = 'comflashbooks-assinatura-premium-anual',
}

interface SubscriptionDetails {
  id: PlanId;
  title: string;
  months: number;
  discountedPrice: number;
  monthlyPrice: number;
  subscriptionOffer: SubscriptionOfferAndroid;
}

export const Subscription = ({
  route,
}: RouteParams<RouteName.Subscription>) => {
  // const { theme } = useTheme();
  const {
    connected,
    subscriptions,
    getSubscriptions,
    currentPurchase,
    currentPurchaseError,
    requestSubscription,
  } = useIAP();

  const [selectedPlanId, setSelectedPlanId] = useState(PlanId.Trimestral);

  const availableSubscriptions: SubscriptionDetails[] = useMemo(() => {
    if (!subscriptions) return [];

    const premiumSubscription = subscriptions.find(
      (subscription) => subscription.productId === premiumSubscriptionSku
    );

    if (!premiumSubscription) return [];

    if (premiumSubscription.platform !== SubscriptionPlatform.android) {
      return [];
    }

    const monthlyPlan = premiumSubscription.subscriptionOfferDetails.find(
      (offer) => offer.basePlanId === PlanId.Monthly
    );

    const trimestralPlan = premiumSubscription.subscriptionOfferDetails.find(
      (offer) => offer.basePlanId === PlanId.Trimestral
    );

    const annualPlan = premiumSubscription.subscriptionOfferDetails.find(
      (offer) => offer.basePlanId === PlanId.Annual
    );

    if (
      !monthlyPlan ||
      !monthlyPlan.pricingPhases.pricingPhaseList[0] ||
      !trimestralPlan ||
      !trimestralPlan.pricingPhases.pricingPhaseList[0] ||
      !annualPlan ||
      !annualPlan.pricingPhases.pricingPhaseList[0]
    ) {
      return [];
    }

    const monthlyPlanPrice =
      Number(monthlyPlan.pricingPhases.pricingPhaseList[0].priceAmountMicros) /
      1000000;

    return [
      {
        id: monthlyPlan.basePlanId as PlanId,
        title: 'Plano Mensal',
        months: 1,
        discountedPrice: monthlyPlanPrice,
        monthlyPrice: monthlyPlanPrice,
        subscriptionOffer: monthlyPlan,
      },
      {
        id: trimestralPlan.basePlanId as PlanId,
        title: 'Plano Trimestral',
        months: 3,
        discountedPrice:
          Number(
            trimestralPlan.pricingPhases.pricingPhaseList[0].priceAmountMicros
          ) / 1000000,
        monthlyPrice: monthlyPlanPrice,
        subscriptionOffer: trimestralPlan,
      },
      {
        id: annualPlan.basePlanId as PlanId,
        title: 'Plano Anual',
        months: 12,
        discountedPrice:
          Number(
            annualPlan.pricingPhases.pricingPhaseList[0].priceAmountMicros
          ) / 1000000,
        monthlyPrice: monthlyPlanPrice,
        subscriptionOffer: annualPlan,
      },
    ];
  }, [subscriptions]);

  useEffect(() => {
    if (!connected) return;

    getSubscriptions({
      skus: [premiumSubscriptionSku],
    });
  }, [connected, getSubscriptions]);

  useEffect(() => {
    if (!currentPurchaseError) return;
    console.log(
      'currentPurchaseError [Subscription]',
      JSON.stringify(currentPurchaseError, null, 2)
    );
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  useEffect(() => {
    if (!currentPurchase) return;
    console.log(
      'currentPurchase [Subscription]',
      JSON.stringify(currentPurchase, null, 2)
    );
    // ... listen to currentPurchase, to check if the purchase went through
  }, [currentPurchase]);

  const handleRequestSubscription = async () => {
    if (!selectedPlanId) return;

    const selectedSubscriptionDetails = availableSubscriptions.find(
      (subscription) => subscription.id === selectedPlanId
    );
    if (!selectedSubscriptionDetails) return;

    const { subscriptionOffer } = selectedSubscriptionDetails;

    await requestSubscription({
      subscriptionOffers: [
        {
          sku: premiumSubscriptionSku,
          offerToken: subscriptionOffer.offerToken,
        },
      ],
    });
    console.log('Subscription requested successfully');
  };

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

        {currentPurchaseError && (
          <View>
            <Typography variant={TypographyVariant.Body}>
              {currentPurchaseError.message}
            </Typography>
          </View>
        )}

        <View
          style={{
            marginTop: 'auto',
            display: 'flex',
            gap: 16,
          }}>
          {subscriptions.map((subscription) => (
            <View key={subscription.productId}></View>
          ))}

          {availableSubscriptions.map((subscription) => (
            <PlanCard
              key={subscription.id}
              title={subscription.title}
              months={subscription.months}
              discountedPrice={subscription.discountedPrice}
              monthlyPrice={subscription.monthlyPrice}
              onPress={() => setSelectedPlanId(subscription.id)}
              isSelected={selectedPlanId === subscription.id}
            />
          ))}

          <Button
            disabled={!availableSubscriptions.length}
            onPress={handleRequestSubscription}
            style={{ marginTop: 'auto' }}>
            <Typography variant={TypographyVariant.Button}>Assinar</Typography>
          </Button>
        </View>
      </View>
    </PageLayout>
  );
};

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

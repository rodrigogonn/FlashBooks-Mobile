import { useSubscription } from 'hooks/useSubscription';
import React, { useEffect } from 'react';
import { EmitterSubscription } from 'react-native';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseUpdatedListener,
  finishTransaction,
} from 'react-native-iap';
import { useIAP } from 'react-native-iap';
import { subscriptionsService } from 'services/subscriptions';
import { Toast } from 'toastify-react-native';

interface IAPListenerProviderProps {
  children: React.ReactNode;
}

export const IAPListenerProvider: React.FC<IAPListenerProviderProps> = ({
  children,
}) => {
  const { connected } = useIAP();
  const { setSubscription } = useSubscription();

  useEffect(() => {
    if (!connected) return;

    let purchaseUpdateSubscription: EmitterSubscription | null = null;
    // let purchaseErrorSubscription: EmitterSubscription | null = null;

    // Limpa as compras pendentes "fantasma"
    flushFailedPurchasesCachedAsPendingAndroid()
      .then(() => {
        purchaseUpdateSubscription = purchaseUpdatedListener(
          async (purchase) => {
            if (purchase.transactionReceipt) {
              try {
                const { subscription } =
                  await subscriptionsService.verifyPurchase(
                    JSON.parse(purchase.transactionReceipt)
                  );

                setSubscription(subscription);

                await finishTransaction({ purchase, isConsumable: false });

                console.log('Transação finalizada com sucesso!');
              } catch (err) {
                Toast.show({
                  type: 'error',
                  text1: `Ocorreu um erro ao processar a assinatura. ${
                    err instanceof Error ? err.message : 'Erro desconhecido'
                  }`,
                  visibilityTime: 7000,
                });
              }
            }
          }
        );

        // purchaseErrorSubscription = purchaseErrorListener((error) => {
        //   console.warn('Erro na compra:', error);
        // });
      })
      .catch((err) => {
        console.warn('Erro ao limpar compras pendentes:', err);
      });

    return () => {
      purchaseUpdateSubscription?.remove();
      // purchaseErrorSubscription?.remove();
    };
  }, [connected, setSubscription]);

  return <>{children}</>;
};

import React, { useEffect } from 'react';
import { EmitterSubscription } from 'react-native';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
} from 'react-native-iap';
import { useIAP } from 'react-native-iap';
import { subscriptionsService } from 'services/subscriptions';

interface IAPListenerProviderProps {
  children: React.ReactNode;
}

export const IAPListenerProvider: React.FC<IAPListenerProviderProps> = ({
  children,
}) => {
  const { connected } = useIAP();

  useEffect(() => {
    if (!connected) return;

    let purchaseUpdateSubscription: EmitterSubscription | null = null;
    let purchaseErrorSubscription: EmitterSubscription | null = null;

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

                console.log(
                  'Subscription:',
                  JSON.stringify(subscription, null, 2)
                );

                // @TODO atualizar a assinatura localmente aqui com o retorno do backend

                const test = true;
                if (!test) {
                  await finishTransaction({ purchase, isConsumable: false });
                } else {
                  console.log('Caiu aqui no teste');
                }

                console.log('Transação finalizada com sucesso!');
              } catch (err) {
                console.warn('Erro ao finalizar a transação:', err);
              }
            }
          }
        );

        purchaseErrorSubscription = purchaseErrorListener((error) => {
          console.warn('Erro na compra:', error);
        });
      })
      .catch((err) => {
        console.warn('Erro ao limpar compras pendentes:', err);
      });

    return () => {
      purchaseUpdateSubscription?.remove();
      purchaseErrorSubscription?.remove();
    };
  }, [connected]);

  return <>{children}</>;
};

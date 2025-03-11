import React, { useEffect } from 'react';
import { Alert, EmitterSubscription } from 'react-native';
import {
  flushFailedPurchasesCachedAsPendingAndroid,
  purchaseUpdatedListener,
  purchaseErrorListener,
  finishTransaction,
} from 'react-native-iap';
import { useIAP } from 'react-native-iap';

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
            console.log('Compra atualizada:', purchase);
            Alert.alert('Compra atualizada', JSON.stringify(purchase));
            if (purchase.transactionReceipt) {
              try {
                // Aqui você envia o receipt para seu backend para validação
                // Exemplo: await yourAPI.verifyPurchase(purchase.transactionReceipt);
                // Se a verificação for bem-sucedida, finalize a transação:
                // @TODO atualizar a assinatura localmente aqui com o retorno do backend
                await finishTransaction({ purchase, isConsumable: false });
                console.log('Transação finalizada com sucesso!');
              } catch (err) {
                console.warn('Erro ao finalizar a transação:', err);
              }
            }
          }
        );

        purchaseErrorSubscription = purchaseErrorListener((error) => {
          console.warn('Erro na compra:', error);
          Alert.alert('Erro na compra', JSON.stringify(error));
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

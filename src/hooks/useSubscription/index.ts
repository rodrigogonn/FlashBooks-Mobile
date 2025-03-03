import {
  SubscriptionContext,
  SubscriptionContextType,
} from 'providers/SubscriptionProvider';
import { useContext } from 'react';

export function useSubscription(): SubscriptionContextType {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      'useSubscription deve ser usado dentro de um SubscriptionProvider'
    );
  }

  return context;
}

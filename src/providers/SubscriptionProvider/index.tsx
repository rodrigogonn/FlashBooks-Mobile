import React, {
  createContext,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import { createUserSpecificStorage } from 'utils/userStorageAdapter';
import { useAuthStore } from 'stores/useAuthStore';
import { Subscription } from 'services/subscriptions/types';
import { subscriptionsService } from 'services/subscriptions';
import { DateTime } from 'luxon';

interface SubscriptionStorageState {
  subscription: Subscription | null;
}

interface SubscriptionState {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

export interface SubscriptionContextType {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
  setSubscription: (subscription: Subscription | null) => void;
}

export const SubscriptionContext =
  createContext<SubscriptionContextType | null>(null);

const initialState: SubscriptionState = {
  subscription: null,
  loading: true,
  error: null,
};

const subscriptionStoreKey = 'subscription-storage';

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(initialState);
  const { user } = useAuthStore();

  const storage = useMemo(() => {
    return createUserSpecificStorage(user?.id || 'default');
  }, [user]);

  const getPersistedData = useCallback(async () => {
    if (!user) return null;

    const persistedData = await storage.getItem(subscriptionStoreKey);

    if (persistedData) {
      const parsedData = JSON.parse(persistedData) as SubscriptionStorageState;
      return parsedData;
    }

    return null;
  }, [storage, user]);

  const persistData = useCallback(
    async (data: SubscriptionState) => {
      try {
        if (!user) return;
        const storageData: SubscriptionStorageState = {
          subscription: data.subscription,
        };
        await storage.setItem(
          subscriptionStoreKey,
          JSON.stringify(storageData)
        );
      } catch (error) {
        console.error('Error persisting subscription data:', error);
      }
    },
    [storage, user]
  );

  const isSubscriptionExpired = useCallback(
    (subscription: Subscription | null) => {
      if (!subscription) return true;

      const expiryTime = DateTime.fromISO(subscription.expiryTime).plus({
        minutes: 5,
      });
      const now = DateTime.now();

      return now > expiryTime;
    },
    []
  );

  const fetchSubscription = useCallback(async () => {
    const updatedState: Partial<SubscriptionState> = {};

    try {
      setState((prev) => ({ ...prev, error: null }));

      const { subscriptions } = await subscriptionsService.getSubscriptions();
      const activeSubscription = subscriptions[0] || null;

      if (isSubscriptionExpired(activeSubscription)) {
        updatedState.subscription = null;
      } else {
        updatedState.subscription = activeSubscription;
      }
    } catch (error) {
      const persistedData = await getPersistedData().catch(() => null);
      if (persistedData) {
        updatedState.subscription = persistedData.subscription;
      }
      console.error('Error fetching subscription:', error);
      updatedState.error = 'Erro ao carregar assinatura';
    } finally {
      setState((prev) => ({ ...prev, ...updatedState, loading: false }));
    }
  }, [isSubscriptionExpired, getPersistedData]);

  useEffect(() => {
    if (!user) return;

    fetchSubscription();

    const interval = setInterval(() => {
      fetchSubscription();
    }, 1000 * 60 * 60 * 24); // Refetch a cada 24 horas

    return () => clearInterval(interval);
  }, [user, fetchSubscription]);

  useEffect(() => {
    if (state.subscription) {
      persistData(state);
    }
  }, [state, persistData]);

  useEffect(() => {
    if (!state.subscription) return;

    const expiryTime = DateTime.fromISO(state.subscription.expiryTime);
    const now = DateTime.now();
    const msUntilExpiry =
      expiryTime.plus({ minutes: 5 }).toMillis() - now.toMillis();

    const timeout = setTimeout(() => {
      setState((prev) => ({ ...prev, subscription: null }));
    }, msUntilExpiry);

    return () => clearTimeout(timeout);
  }, [state.subscription]);

  const setSubscription = useCallback((subscription: Subscription | null) => {
    setState((prev) => ({ ...prev, subscription }));
  }, []);

  const contextValue = useMemo(
    () => ({
      subscription: state.subscription,
      loading: state.loading,
      error: state.error,
      setSubscription,
    }),
    [state.subscription, state.loading, state.error, setSubscription]
  );

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

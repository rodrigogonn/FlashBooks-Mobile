import React, {
  createContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { createUserSpecificStorage } from 'utils/userStorageAdapter';
import { useAuthStore } from 'stores/useAuthStore';
import { Subscription, SubscriptionStatus } from 'services/subscriptions/types';
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
}

type SubscriptionAction =
  | { type: 'SET_SUBSCRIPTION'; payload: { subscription: Subscription | null } }
  | { type: 'LOAD_PERSISTED_DATA'; payload: SubscriptionState }
  | { type: 'SET_LOADING'; payload: { loading: boolean } }
  | { type: 'SET_ERROR'; payload: { error: string | null } };

export const SubscriptionContext =
  createContext<SubscriptionContextType | null>(null);

function subscriptionReducer(
  state: SubscriptionState,
  action: SubscriptionAction
): SubscriptionState {
  switch (action.type) {
    case 'SET_SUBSCRIPTION':
      return {
        ...state,
        subscription: action.payload.subscription,
      };

    case 'LOAD_PERSISTED_DATA':
      return action.payload;

    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload.loading,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

const subscriptionStoreKey = 'subscription-storage';

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);
  const { user } = useAuthStore();

  const storage = useMemo(() => {
    return createUserSpecificStorage(user?.id || 'default');
  }, [user]);

  const loadPersistedData = useCallback(async () => {
    try {
      if (!user) return;

      const persistedData = await storage.getItem(subscriptionStoreKey);

      if (persistedData) {
        const parsedData = JSON.parse(
          persistedData
        ) as SubscriptionStorageState;
        dispatch({
          type: 'LOAD_PERSISTED_DATA',
          payload: {
            ...initialState,
            subscription: parsedData.subscription,
          },
        });
      }
    } catch (error) {
      console.error('Error loading persisted subscription data:', error);
    }
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

      const expiryTime = DateTime.fromISO(subscription.expiryTime);
      const now = DateTime.now();

      return (
        now > expiryTime || subscription.status !== SubscriptionStatus.ACTIVE
      );
    },
    []
  );

  const fetchSubscription = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: { loading: true } });
      dispatch({ type: 'SET_ERROR', payload: { error: null } });

      const { subscriptions } = await subscriptionsService.getSubscriptions();
      const activeSubscription = subscriptions[0] || null;

      if (isSubscriptionExpired(activeSubscription)) {
        dispatch({
          type: 'SET_SUBSCRIPTION',
          payload: { subscription: null },
        });
      } else {
        dispatch({
          type: 'SET_SUBSCRIPTION',
          payload: { subscription: activeSubscription },
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
      dispatch({
        type: 'SET_ERROR',
        payload: { error: 'Erro ao carregar assinatura' },
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { loading: false } });
    }
  }, [isSubscriptionExpired]);

  const contextValue = useMemo(
    () => ({
      subscription: state.subscription,
      loading: state.loading,
      error: state.error,
    }),
    [state.subscription, state.loading, state.error]
  );

  useEffect(() => {
    loadPersistedData();
  }, [loadPersistedData]);

  useEffect(() => {
    if (user) {
      fetchSubscription();
    }
  }, [user, fetchSubscription]);

  useEffect(() => {
    persistData(state);
  }, [state, persistData]);

  useEffect(() => {
    if (!state.subscription) return;

    const expiryTime = DateTime.fromISO(state.subscription.expiryTime);
    const now = DateTime.now();
    const msUntilExpiry = expiryTime.toMillis() - now.toMillis();

    if (msUntilExpiry <= 0) {
      dispatch({
        type: 'SET_SUBSCRIPTION',
        payload: { subscription: null },
      });
      return;
    }

    const timeout = setTimeout(() => {
      dispatch({
        type: 'SET_SUBSCRIPTION',
        payload: { subscription: null },
      });
    }, msUntilExpiry);

    return () => clearTimeout(timeout);
  }, [state.subscription]);

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};

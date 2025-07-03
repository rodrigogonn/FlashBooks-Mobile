import { authenticatedApi } from 'core/api/authenticatedApi';
import { Subscription } from './types';

export const subscriptionsService = {
  getSubscriptions: async () => {
    const response = await authenticatedApi.get<{
      subscriptions: Subscription[];
    }>('/api/subscriptions');

    return response.data;
  },

  verifyPurchase: async (params: {
    purchaseToken: string;
    packageName: string;
    productId: string;
  }) => {
    const response = await authenticatedApi.post<{
      subscription: Subscription;
    }>('/api/subscriptions/verifyPurchase', params);

    return response.data;
  },
};

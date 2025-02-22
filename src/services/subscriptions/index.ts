import { authenticatedApi } from 'core/api/authenticatedApi';
import { Subscription } from './types';

export const subscriptionsService = {
  getSubscriptions: async () => {
    const response = await authenticatedApi.get<{
      subscriptions: Subscription[];
    }>('/api/subscriptions');

    return response.data;
  },
};

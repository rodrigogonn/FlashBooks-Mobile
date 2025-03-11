export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  ON_HOLD = 'ON_HOLD',
  REVOKED = 'REVOKED',
}

export interface Subscription {
  id: string;
  userId?: string;
  packageName: string;
  productId: string;
  purchaseToken: string;
  status: SubscriptionStatus;
  startTime: string;
  expiryTime: string;
  createdAt: string;
  updatedAt: string;
}

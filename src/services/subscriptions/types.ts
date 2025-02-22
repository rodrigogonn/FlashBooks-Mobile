export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  ON_HOLD = 'ON_HOLD',
  GRACE_PERIOD = 'GRACE_PERIOD',
  PAUSED = 'PAUSED',
  REVOKED = 'REVOKED',
}

export interface Subscription {
  id: string;
  userId?: string;
  packageName: string;
  productId: string;
  purchaseToken: string;
  status: SubscriptionStatus;
  startTime: Date;
  expiryTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

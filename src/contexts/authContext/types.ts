export interface AuthContextData {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  token?: string;
}

export interface Subscription {
  productId: string;
  purchaseToken: string;
  expiresAt: Date;
  autoRenewing: boolean;
  paymentState: number;
  isInGracePeriod: boolean;
  userCancellationTime?: Date;
  countryCode?: string;
  lastModifiedAt?: Date;
}

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
  subscription?: Subscription;
}

export interface User {
  id: number;
  name: string;
  email: string;
  subscription?: Subscription;
}

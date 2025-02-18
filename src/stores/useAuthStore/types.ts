export interface AuthContextData {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  token?: string;
}

// @TODO ajustar essa tipagem aqui
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
  userId: string;
  username: string;
  email: string;
  subscription?: Subscription;
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscription?: Subscription;
}

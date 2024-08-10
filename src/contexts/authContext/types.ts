export interface AuthContextData {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  token?: string;
}

export interface JwtPayload {
  userId: number;
  username: string;
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

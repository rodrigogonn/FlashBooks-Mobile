export interface AuthContextData {
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  user?: User;
  token?: string;
}

export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
}

export interface User {
  id: string;
  name: string;
  photo?: string;
  email: string;
}

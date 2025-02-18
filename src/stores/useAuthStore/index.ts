import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { googleAuthService } from 'services/googleAuth';
import { jwtDecode } from 'jwt-decode';
import { authService } from 'services/auth';
import { JwtPayload, Subscription, User } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      loginWithGoogle: async () => {
        const test = false;

        if (test) {
          set({
            token: 'test',
            user: {
              id: 'test',
              name: 'test',
              email: 'test',
              subscription: {} as Subscription,
            },
          });
          return;
        }

        const { token } = await authService.loginWithGoogle();
        const payload = jwtDecode<JwtPayload>(token);

        set({
          token,
          user: {
            id: payload.userId,
            name: payload.username,
            email: payload.email,
            subscription: {} as Subscription, // @TODO: Como adiciono a subscription? E tipar direito ela de acordo com back
          },
        });
      },
      logout: async () => {
        await googleAuthService.signOut();
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

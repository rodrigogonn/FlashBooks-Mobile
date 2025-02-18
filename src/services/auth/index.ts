import { api } from 'core/api/api';
import { googleAuthService } from 'services/googleAuth';

export const authService = {
  loginWithGoogle: async () => {
    const { idToken } = await googleAuthService.signIn();
    const response = await api.post<{ token: string }>(
      '/api/auth/loginWithGoogle',
      {
        idToken,
      }
    );

    return response.data;
  },
};

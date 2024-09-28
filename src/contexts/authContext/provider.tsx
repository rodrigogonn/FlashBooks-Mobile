import { env } from 'environment';
import { AuthContext } from './context';
import { googleAuthService } from 'services/googleAuth';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, User } from './types';
import { useState } from 'react';

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  // @TODO salvar no localStorage
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  const loginWithGoogle = async () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'JohnDoe@gmail.com',
    };

    if (mockUser) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setToken('mockToken');
      setUser(mockUser);
      return;
    }

    const { idToken } = await googleAuthService.signIn();
    const {
      data: { token },
    } = await axios.post<{ token: string }>(
      `${env.API_URL}/api/auth/loginWithGoogle`,
      {
        idToken,
      }
    );

    const payload = jwtDecode<JwtPayload>(token);

    setToken(token);
    setUser({
      id: payload.userId,
      name: payload.username,
      email: payload.email,
    });
  };

  const logout = async () => {
    await googleAuthService.signOut();
    setToken(undefined);
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        loginWithGoogle,
        logout,
        user,
        token,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

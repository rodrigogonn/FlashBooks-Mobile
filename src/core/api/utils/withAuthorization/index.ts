import { AxiosInstance } from 'axios';
import { useAuthStore } from 'stores/useAuthStore';

export const withAuthorization = (instance: AxiosInstance) => {
  instance.interceptors.request.use(async (reqConfig) => {
    const { token } = useAuthStore.getState();

    if (token) {
      reqConfig.headers.setAuthorization(`Bearer ${token}`);
    } else {
      return Promise.reject(new Error('Authorization header not found'));
    }
    return reqConfig;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await useAuthStore.getState().logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

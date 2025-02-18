import axios from 'axios';
import { env } from 'environment';

export const createApiInstance = () => {
  return axios.create({
    baseURL: env.API_URL,
  });
};

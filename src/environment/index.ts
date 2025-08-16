import { GOOGLE_WEB_CLIENT_ID, API_URL, ENV } from '@env';

export const env = {
  ENV,
  IS_PRODUCTION: ENV === 'production',
  IS_DEVELOPMENT: ENV === 'development',
  IS_STAGING: ENV === 'staging',
  GOOGLE_WEB_CLIENT_ID,
  API_URL,
};

import { env } from 'environment';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: env.GOOGLE_WEB_CLIENT_ID,
});

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }

    throw error;
  }
};

const signOut = async () => {
  await GoogleSignin.signOut();
};

export const googleAuthService = {
  signIn,
  signOut,
};

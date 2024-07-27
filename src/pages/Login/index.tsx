import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Button } from 'components/Button';
import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { RouteName, RouteParams } from 'routes/types';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
});

const signIn = async () => {
  console.log('signIn');
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('userInfo', userInfo);
  } catch (error) {
    console.error('signIn error', error);
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
  }
};

export const Login = ({}: RouteParams<RouteName.Login>) => {
  return (
    <PageLayout>
      <Typography variant={TypographyVariant.Title}>Login</Typography>
      <Button
        onPress={() => {
          signIn();
        }}>
        <Typography variant={TypographyVariant.Button}>Login</Typography>
      </Button>
    </PageLayout>
  );
};

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BookList } from 'pages/BookList';
import { Discover } from 'pages/Home/Discover';
import { Library } from 'pages/Home/Library';
import { Login } from 'pages/Login';
import { Reading } from 'pages/Reading';
import {
  RouteName,
  RouteParams,
  StackRouteParamList,
  TabRouteParamList,
} from './types';
import { useAuth } from 'contexts/authContext';
import { buildHomeScreenOptions } from './styles';
import { useTheme } from 'contexts/themeContext';

const Stack = createNativeStackNavigator<StackRouteParamList>();
const Tab = createBottomTabNavigator<TabRouteParamList>();

export const Home = ({}: RouteParams<RouteName.Home>) => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName={RouteName.Discover} // @TODO se usuario já tiver livros em andamento, a primeira deveria ser Library
      screenOptions={buildHomeScreenOptions({ theme })}>
      <Tab.Screen name={RouteName.Discover} component={Discover} />
      <Tab.Screen name={RouteName.Library} component={Library} />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  const { user: logged } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {logged ? (
          <>
            <Stack.Screen name={RouteName.Home} component={Home} />
            <Stack.Screen name={RouteName.Reading} component={Reading} />
            <Stack.Screen name={RouteName.BookList} component={BookList} />
          </>
        ) : (
          <>
            <Stack.Screen name={RouteName.Login} component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

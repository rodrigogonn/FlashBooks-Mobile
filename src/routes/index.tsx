import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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

const Stack = createNativeStackNavigator<StackRouteParamList>();
const Tab = createBottomTabNavigator<TabRouteParamList>();

export const Home = ({}: RouteParams<RouteName.Home>) => {
  return (
    <Tab.Navigator
      initialRouteName={RouteName.Discover}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          switch (route.name) {
            case RouteName.Discover:
              iconName = 'compass';
              break;
            case RouteName.Library:
              iconName = 'bookmark';
              break;
          }

          return <FontAwesome5 name={iconName} size={24} color={color} />;
        },
        tabBarStyle: {
          height: 72,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          height: 16,
        },
        headerShown: false,
      })}>
      <Tab.Screen name={RouteName.Discover} component={Discover} />
      <Tab.Screen name={RouteName.Library} component={Library} />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={RouteName.Login}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={RouteName.Home} component={Home} />
        <Stack.Screen name={RouteName.Reading} component={Reading} />
        <Stack.Screen name={RouteName.BookList} component={BookList} />
        <Stack.Screen name={RouteName.Login} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

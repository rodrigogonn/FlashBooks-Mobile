import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Book } from 'contexts/booksContext';
import { BookList } from 'pages/BookList';
import { Home } from 'pages/Home';
import { Library } from 'pages/Library';
import { Reading } from 'pages/Reading';

type TabRouteParamList = {
  Home: undefined;
  Library: undefined;
};

type StackRouteParamList = {
  Root: NavigatorScreenParams<TabRouteParamList>;
  Reading: undefined;
  BookList: { title: string; books: Book[] };
};

export type RouteParams<
  RouteName extends keyof (StackRouteParamList & TabRouteParamList)
> = RouteName extends keyof TabRouteParamList
  ? BottomTabScreenProps<TabRouteParamList, RouteName>
  : RouteName extends keyof StackRouteParamList
  ? NativeStackScreenProps<StackRouteParamList, RouteName>
  : never;

const Stack = createNativeStackNavigator<StackRouteParamList>();
const Tab = createBottomTabNavigator<TabRouteParamList>();

export type StackNavigation = NativeStackNavigationProp<StackRouteParamList>;

export const Root = ({}: RouteParams<'Root'>) => {
  return (
    <Tab.Navigator initialRouteName="Library">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Library" component={Library} />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen
          name="Reading"
          component={Reading}
          options={{
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="BookList"
          component={BookList}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

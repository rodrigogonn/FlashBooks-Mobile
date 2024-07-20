import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
import { Discover } from 'pages/Home/Discover';
import { Library } from 'pages/Home/Library';
import { Reading } from 'pages/Reading';

type TabRouteParamList = {
  Discover: undefined;
  Library: undefined;
};

type StackRouteParamList = {
  Home: NavigatorScreenParams<TabRouteParamList>;
  Reading: { book: Book };
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

export const Home = ({}: RouteParams<'Home'>) => {
  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Discover':
              iconName = 'compass';
              break;
            case 'Library':
              iconName = 'bookmark';
              break;
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          // height: 100, // @TODO ajustar o menu
        },
        tabBarItemStyle: {
          // padding: 16,
        },
        tabBarLabelStyle: {
          // padding: 16,
        },
        tabBarIconStyle: {
          // padding: 16,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Explorar',
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: 'Biblioteca',
        }}
      />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Reading" component={Reading} />
        <Stack.Screen name="BookList" component={BookList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

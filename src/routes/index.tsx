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
import { buildHomeScreenOptions } from './styles';
import { Subscription } from 'pages/Subscription';
import { useAuthStore } from 'stores/useAuthStore';
import React, { useEffect, useMemo } from 'react';
import { useTheme } from 'hooks/useTheme';
import { booksService } from 'services/books';
import { useBooksStore } from 'stores/useBooksStore';

const Stack = createNativeStackNavigator<StackRouteParamList>();
const Tab = createBottomTabNavigator<TabRouteParamList>();

export const Home = ({}: RouteParams<RouteName.Home>) => {
  const { theme } = useTheme();
  const { books } = useBooksStore();

  const inProgressBooks = useMemo(() => {
    return books.filter((book) => book.lastReadAt);
  }, [books]);

  return (
    <Tab.Navigator
      initialRouteName={
        inProgressBooks.length ? RouteName.Library : RouteName.Discover
      }
      screenOptions={buildHomeScreenOptions({ theme })}>
      <Tab.Screen name={RouteName.Discover} component={Discover} />
      <Tab.Screen name={RouteName.Library} component={Library} />
    </Tab.Navigator>
  );
};

export const Routes = () => {
  const user = useAuthStore((state) => state.user);

  const lastSync = useBooksStore((state) => state.lastSync);
  const syncData = useBooksStore((state) => state.syncData);

  useEffect(() => {
    const sync = async () => {
      if (!user) return;

      const syncResponse = await booksService.getNotSyncedData({
        lastSync,
      });

      syncData(syncResponse);
    };

    sync();
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}>
        {user ? (
          user.subscription ? (
            <>
              <Stack.Screen name={RouteName.Home} component={Home} />
              <Stack.Screen name={RouteName.Reading} component={Reading} />
              <Stack.Screen name={RouteName.BookList} component={BookList} />
            </>
          ) : (
            <>
              <Stack.Screen
                name={RouteName.Subscription}
                component={Subscription}
              />
            </>
          )
        ) : (
          <>
            <Stack.Screen name={RouteName.Login} component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

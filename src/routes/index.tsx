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
import { Subscription as SubscriptionPage } from 'pages/Subscription';
import { useAuthStore } from 'stores/useAuthStore';
import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'hooks/useTheme';
import { booksService } from 'services/books';
import { subscriptionsService } from 'services/subscriptions';
import { Subscription } from 'services/subscriptions/types';
import { useBooks } from 'hooks/useBooks';
import { BooksProvider } from 'providers/BooksProvider';
import { ReadingProvider } from 'providers/ReadingProvider';
import { StatusBar } from 'expo-status-bar';
import { ThemeName } from 'theme/types';
import { LoadingPage } from 'components/LoadingPage';
import { ErrorPage } from 'components/ErrorPage';

const Stack = createNativeStackNavigator<StackRouteParamList>();
const Tab = createBottomTabNavigator<TabRouteParamList>();

export const Home = ({}: RouteParams<RouteName.Home>) => {
  const { theme } = useTheme();
  const { books } = useBooks();

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

export const LoggedInRoutes = () => {
  const { lastSync, syncData } = useBooks();

  const [activeSubscription, setActiveSubscription] = useState<Subscription>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(false);
      // @TODO criar um provider pra assinatura para que verifique a expiração para poder usar offline
      const { subscriptions } = await subscriptionsService.getSubscriptions();
      const activeSubscription = subscriptions[0];

      setActiveSubscription(activeSubscription);

      if (!activeSubscription) return;

      const syncResponse = await booksService.getNotSyncedData({
        lastSync,
      });

      syncData(syncResponse);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage onRetry={loadData} />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
      }}>
      {activeSubscription ? (
        <>
          <Stack.Screen name={RouteName.Home} component={Home} />
          <Stack.Screen name={RouteName.Reading} component={Reading} />
          <Stack.Screen name={RouteName.BookList} component={BookList} />
        </>
      ) : (
        <Stack.Screen
          name={RouteName.Subscription}
          component={SubscriptionPage}
        />
      )}
    </Stack.Navigator>
  );
};

export const Routes = () => {
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();

  return (
    <>
      <NavigationContainer>
        {user ? (
          <BooksProvider userId={user.id}>
            <ReadingProvider userId={user.id}>
              <LoggedInRoutes />
            </ReadingProvider>
          </BooksProvider>
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_bottom',
            }}>
            <Stack.Screen name={RouteName.Login} component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>

      <StatusBar style={theme.name === ThemeName.Dark ? 'light' : 'dark'} />
    </>
  );
};

import { RouteProp } from '@react-navigation/native';
import { RouteName, TabRouteParamList } from './types';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Theme } from 'theme/types';

export const buildHomeScreenOptions =
  ({ theme }: { theme: Theme }) =>
  ({
    route,
  }: {
    route: RouteProp<TabRouteParamList, keyof TabRouteParamList>;
  }): BottomTabNavigationOptions => ({
    tabBarInactiveTintColor: theme.colors.common.icon.normal,
    tabBarActiveTintColor: theme.colors.common.icon.active,
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
      backgroundColor: theme.colors.page.background,
      borderColor: theme.colors.common.border.normal,
      borderTopWidth: 1,
    },
    tabBarItemStyle: {
      paddingVertical: 8,
    },
    tabBarLabelStyle: {
      height: 16,
    },
    headerShown: false,
  });

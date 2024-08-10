import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from 'components/Header';
import { useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { RouteName, RouteParamList } from 'routes/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'contexts/themeContext';
import { useAuth } from 'contexts/authContext';

interface PageLayoutProps {
  header?: {
    title?: string;
  };
  children?: React.ReactNode;
}

export const PageLayout = ({ children, header }: PageLayoutProps) => {
  const route = useRoute<RouteProp<RouteParamList>>();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const { title = route.name } = header || {};
  const canGoBack = useMemo(() => {
    return Object.values(RouteName).includes(route.name);
  }, [route.name]);

  return (
    <>
      <Header
        title={title}
        canGoBack={canGoBack}
        rightComponent={
          <TouchableOpacity
            onPress={logout}
            style={{
              padding: 4,
            }}>
            <MaterialIcons
              name="logout"
              size={20}
              color={theme.colors.page.title}
            />
          </TouchableOpacity>
        }
      />

      <ScrollView
        style={{
          height: '100%',
        }}>
        <View
          style={{
            paddingTop: 16,
            paddingBottom: 64,
            gap: 16,
          }}>
          {children}
        </View>
      </ScrollView>
    </>
  );
};

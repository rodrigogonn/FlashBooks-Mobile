import { RouteProp, useRoute } from '@react-navigation/native';
import { Header } from 'components/Header';
import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { RouteName, RouteParamList } from 'routes/types';

interface PageLayoutProps {
  header?: {
    title?: string;
  };
  children?: React.ReactNode;
}

export const PageLayout = ({ children, header }: PageLayoutProps) => {
  const route = useRoute<RouteProp<RouteParamList>>();
  const { title = route.name } = header || {};
  const canGoBack = useMemo(() => {
    return Object.values(RouteName).includes(route.name);
  }, [route.name]);

  return (
    <>
      <Header title={title} canGoBack={canGoBack} />

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

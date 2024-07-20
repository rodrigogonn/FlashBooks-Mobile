import { useRoute } from '@react-navigation/native';
import { Header } from 'components/Header';
import { ScrollView, View } from 'react-native';

interface PageLayoutProps {
  header?: {
    title?: string;
  };
  children?: React.ReactNode;
}

export const PageLayout = ({ children, header }: PageLayoutProps) => {
  const route = useRoute();
  const { title = route.name } = header || {};

  return (
    <>
      <Header title={title} />

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

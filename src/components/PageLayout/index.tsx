import { Header } from 'components/Header';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'hooks/useTheme';
import { useAuthStore } from 'stores/useAuthStore';

interface PageLayoutProps {
  header?: {
    title?: string;
    canGoBack?: boolean;
  };
  children?: React.ReactNode;
}

export const PageLayout = ({ children, header }: PageLayoutProps) => {
  const logout = useAuthStore((state) => state.logout);
  const { theme } = useTheme();
  const { title, canGoBack } = header || {};
  const loggedIn = useAuthStore((state) => state.user);

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: theme.colors.page.background,
      }}>
      <Header
        title={title}
        canGoBack={canGoBack}
        rightComponent={
          loggedIn && (
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
          )
        }
      />

      <ScrollView
        style={{
          height: '100%',
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View
          style={{
            paddingTop: 16,
            flexGrow: 1,
            paddingBottom: 64,
            gap: 16,
          }}>
          {children}
        </View>
      </ScrollView>
    </View>
  );
};

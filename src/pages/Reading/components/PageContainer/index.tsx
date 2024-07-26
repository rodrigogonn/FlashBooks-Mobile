import { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';

interface PageContainerProps {
  children?: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <ScrollView
      style={{
        flexGrow: 1,
      }}
      contentContainerStyle={{
        flexGrow: 1,
      }}>
      <View
        style={{
          flexGrow: 1,
          padding: 16,
          paddingBottom: 64,
          gap: 16,
        }}>
        {children}
      </View>
    </ScrollView>
  );
};

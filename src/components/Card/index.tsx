import { useTheme } from 'contexts/themeContext';
import { View, ViewProps, ViewStyle } from 'react-native';

interface CardProps extends ViewProps {
  style?: ViewStyle;
}

export const Card = ({ children, style, ...rest }: CardProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.card.background,
        borderColor: theme.colors.card.border,
        borderWidth: 1,
        borderRadius: 16,
        padding: 16,
        ...style,
      }}
      {...rest}>
      {children}
    </View>
  );
};

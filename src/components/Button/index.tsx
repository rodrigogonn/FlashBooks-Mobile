import { useTheme } from 'hooks/useTheme';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
}

export const Button = ({ children, style, ...rest }: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: theme.colors.button.primary.background,
        ...style,
      }}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

import { useTheme } from 'hooks/useTheme';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  variant?: ButtonVariant;
}

export const Button = ({
  children,
  style,
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  const { theme } = useTheme();

  const variantStyles: Record<ButtonVariant, ViewStyle> = {
    primary: {
      backgroundColor: theme.colors.button.primary.background,
    },
    ghost: {
      backgroundColor: theme.colors.card.background,
    },
  };

  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        ...variantStyles[variant],
        ...style,
      }}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

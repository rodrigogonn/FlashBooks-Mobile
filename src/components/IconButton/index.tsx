import { useTheme } from 'contexts/themeContext';
import { ReactNode } from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export const IconButton = ({ children, style, ...rest }: IconButtonProps) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme.colors.button.icon,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        ...style,
      }}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

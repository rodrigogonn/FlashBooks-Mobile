import { Card } from 'components/Card';
import { useTheme } from 'hooks/useTheme';
import { ReactNode } from 'react';
import {
  FlexStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

interface ModalProps {
  children?: ReactNode;
  open?: boolean;
  onClose?: () => void;
  justifyContent?: FlexStyle['justifyContent'];
  style?: ViewStyle;
}

export const Modal = ({
  children,
  open,
  onClose,
  style,
  justifyContent,
}: ModalProps) => {
  const { theme } = useTheme();

  if (!open) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View
        style={{
          position: 'absolute',
          justifyContent: justifyContent || 'center',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: theme.colors.modal.backdrop,
        }}>
        <Card onStartShouldSetResponder={() => true} style={style}>
          {children}
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

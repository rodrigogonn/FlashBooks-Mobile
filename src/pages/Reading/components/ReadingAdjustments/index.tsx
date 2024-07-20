import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'components/IconButton';
import { Modal } from 'components/Modal';
import { Typography, TypographyVariant } from 'components/Typography';
import { useReading } from 'contexts/readingContext/useReading';
import { useTheme } from 'contexts/themeContext';
import { useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { readingThemes } from 'theme/readingTheme';
import { ReadingThemeName } from 'theme/types';
import { clamp } from 'utils/clamp';

const adjustments = {
  textSize: {
    step: 0.1,
    min: 0.1,
    max: 2,
  },
};

interface ReadingAdjustments {
  open: boolean;
  onClose: () => void;
}

export const ReadingAdjustments = ({ open, onClose }: ReadingAdjustments) => {
  const { readingTheme, theme, changeReadingTheme } = useTheme();
  const { textSize: textSize, changeTextSize } = useReading();

  const themes = useMemo(
    () =>
      Object.entries(readingThemes).map(([themeName, theme]) => ({
        name: themeName as ReadingThemeName,
        color: theme.colors.background,
      })),
    []
  );

  const decreaseTextSize = () => {
    const { min, max, step } = adjustments.textSize;
    const newValue = clamp(textSize - step, min, max);

    changeTextSize(Number(newValue.toFixed(2)));
  };

  const increaseTextSize = () => {
    const { min, max, step } = adjustments.textSize;
    const newValue = clamp(textSize + step, min, max);

    changeTextSize(Number(newValue.toFixed(2)));
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      style={{
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      justifyContent="flex-end">
      <View
        style={{
          gap: 16,
        }}>
        <Typography variant={TypographyVariant.Small}>Cor da página</Typography>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
          }}>
          {themes.map(({ name: themeName, color: themeColor }) => {
            const isActive = readingTheme.name === themeName;

            return (
              <TouchableOpacity
                key={themeName}
                onPress={() => changeReadingTheme(themeName)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: isActive
                    ? theme.colors.common.progress.fill
                    : theme.colors.common.progress.background,
                  backgroundColor: themeColor,
                }}
              />
            );
          })}
        </View>
      </View>

      <View
        style={{
          gap: 16,
          alignItems: 'flex-end',
        }}>
        <Typography variant={TypographyVariant.Small}>
          Tamanho do texto - {(textSize * 100).toFixed(0)}%
        </Typography>
        <View
          style={{
            flexDirection: 'row',
            gap: 16,
          }}>
          <IconButton onPress={decreaseTextSize}>
            <FontAwesome5
              name="minus"
              size={16}
              color={theme.colors.text.primary}
            />
          </IconButton>

          <IconButton onPress={increaseTextSize}>
            <FontAwesome5
              name="plus"
              size={16}
              color={theme.colors.text.primary}
            />
          </IconButton>
        </View>
      </View>
    </Modal>
  );
};

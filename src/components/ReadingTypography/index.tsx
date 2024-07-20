import { useReading } from 'contexts/readingContext/useReading';
import { useTheme } from 'contexts/themeContext';
import { useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export enum ReadingTypographyVariant {
  HeaderTitle,
  Title,
  Paragraph,
}

interface ReadingTypographyProps extends TextProps {
  variant: ReadingTypographyVariant;
  style?: TextStyle;
}

export const ReadingTypography = ({
  children,
  variant,
  ...rest
}: ReadingTypographyProps) => {
  const { style } = useStyleFromVariant(variant);

  return (
    <Text
      {...rest}
      style={{
        ...style,
        ...rest.style,
      }}>
      {children}
    </Text>
  );
};

const useStyleFromVariant = (variant: ReadingTypographyVariant) => {
  const { readingTheme } = useTheme();
  const { textSize } = useReading();

  const style = useMemo(() => {
    switch (variant) {
      case ReadingTypographyVariant.HeaderTitle:
        return {
          fontFamily: readingTheme.fontFamily.bold,
          fontSize: 20,
          color: readingTheme.colors.title,
        };
      case ReadingTypographyVariant.Title:
        return {
          fontFamily: readingTheme.fontFamily.bold,
          fontSize: 24 * textSize,
          color: readingTheme.colors.title,
        };
      case ReadingTypographyVariant.Paragraph:
        return {
          fontFamily: readingTheme.fontFamily.regular,
          fontSize: 16 * textSize,
          color: readingTheme.colors.text,
        };
    }
  }, [variant, readingTheme, textSize]);

  return { style };
};

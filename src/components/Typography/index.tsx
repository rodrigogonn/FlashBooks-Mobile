import { useTheme } from 'contexts/themeContext';
import { useMemo } from 'react';
import { Text, TextProps } from 'react-native';

export enum TypographyVariant {
  Subtitle,
  BookListTitle,
}

interface TypographyProps extends TextProps {
  variant: TypographyVariant;
}

export const Typography = ({ children, variant, ...rest }: TypographyProps) => {
  const { style } = useStyleFromVariant(variant);

  return (
    <Text
      {...rest}
      style={{
        ...style,
        ...(typeof rest.style === 'object' ? rest.style : {}),
      }}>
      {children}
    </Text>
  );
};

const useStyleFromVariant = (variant: TypographyVariant) => {
  const { theme } = useTheme();

  const style = useMemo(() => {
    switch (variant) {
      case TypographyVariant.Subtitle:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 24,
          color: theme.colors.reading.text,
        };
      case TypographyVariant.BookListTitle:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 14,
          color: theme.colors.bookList.text,
        };
    }
  }, [variant]);

  return { style };
};

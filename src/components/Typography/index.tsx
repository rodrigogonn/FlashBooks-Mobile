import { useTheme } from 'contexts/themeContext';
import { useMemo } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export enum TypographyVariant {
  HeaderTitle,
  Body,
  Title,
  Subtitle,
  BookListTitle,
  Small,
}

interface TypographyProps extends TextProps {
  variant: TypographyVariant;
  style?: TextStyle;
}

export const Typography = ({ children, variant, ...rest }: TypographyProps) => {
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

const useStyleFromVariant = (variant: TypographyVariant) => {
  const { theme } = useTheme();

  const style = useMemo(() => {
    switch (variant) {
      case TypographyVariant.HeaderTitle:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.page.title,
        };
      case TypographyVariant.Title:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.page.title,
        };
      case TypographyVariant.Body:
        return {
          fontFamily: theme.fontFamily.regular,
          fontSize: 16,
          color: theme.colors.page.text,
        };
      case TypographyVariant.Subtitle:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 20,
          color: theme.colors.page.text,
        };
      case TypographyVariant.BookListTitle:
        return {
          fontFamily: theme.fontFamily.bold,
          fontSize: 14,
          color: theme.colors.bookList.text,
        };
      case TypographyVariant.Small:
        return {
          fontFamily: theme.fontFamily.regular,
          fontSize: 12,
          color: theme.colors.page.text,
        };
    }
  }, [variant, theme]);

  return { style };
};

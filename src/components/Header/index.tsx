import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from 'components/ReadingTypography';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'hooks/useTheme';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export enum HeaderVariant {
  Default,
  Reading,
}

interface HeaderProps {
  variant?: HeaderVariant;
  title: string;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  canGoBack?: boolean;
}

export const Header = ({
  title,
  variant = HeaderVariant.Default,
  leftComponent,
  rightComponent,
  canGoBack = true,
}: HeaderProps) => {
  const { theme, readingTheme } = useTheme();
  const readingVersion = variant === HeaderVariant.Reading;

  return (
    <>
      <SafeAreaView />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderColor: readingVersion
            ? readingTheme.colors.navigationButton.background
            : theme.colors.common.border.normal,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            flex: 1,
          }}>
          <LeftComponent
            canGoBack={canGoBack}
            leftComponent={leftComponent}
            variant={variant}
          />

          {readingVersion ? (
            <ReadingTypography variant={ReadingTypographyVariant.HeaderTitle}>
              {title}
            </ReadingTypography>
          ) : (
            <Typography variant={TypographyVariant.HeaderTitle}>
              {title}
            </Typography>
          )}
        </View>

        {rightComponent}
      </View>
    </>
  );
};

interface LeftComponentProps {
  variant: HeaderVariant;
  leftComponent?: React.ReactNode;
  canGoBack: boolean;
}
const LeftComponent = ({
  variant,
  leftComponent,
  canGoBack,
}: LeftComponentProps) => {
  const { theme, readingTheme } = useTheme();
  const navigation = useNavigation();
  const readingVersion = variant === HeaderVariant.Reading;

  if (leftComponent) {
    return leftComponent;
  }

  if (canGoBack && navigation.canGoBack()) {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: 4,
        }}>
        <FontAwesome5
          name="arrow-left"
          size={16}
          color={
            readingVersion ? readingTheme.colors.title : theme.colors.page.title
          }
        />
      </TouchableOpacity>
    );
  }

  return null;
};

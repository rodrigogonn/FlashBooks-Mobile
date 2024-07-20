import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from 'components/ReadingTypography';
import { Typography, TypographyVariant } from 'components/Typography';
import { useTheme } from 'contexts/themeContext';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export enum HeaderVariant {
  Default,
  Reading,
}

interface HeaderProps {
  variant?: HeaderVariant;
  title: string;
  rightComponent?: React.ReactNode;
}

export const Header = ({
  title,
  variant = HeaderVariant.Default,
  rightComponent,
}: HeaderProps) => {
  const { theme, readingTheme } = useTheme();
  const navigation = useNavigation();
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
            : theme.colors.card.border,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            flex: 1,
          }}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                padding: 4,
              }}>
              <FontAwesome5
                name="arrow-left"
                size={16}
                color={
                  readingVersion
                    ? readingTheme.colors.title
                    : theme.colors.page.title // @TODO - ajustar componente de voltar, quando pode voltar esta errado, talvez usando navigation errado
                }
              />
            </TouchableOpacity>
          )}
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

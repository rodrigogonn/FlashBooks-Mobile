import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Header, HeaderVariant } from 'components/Header';
import { useReading } from 'hooks/useReading';
import { useTheme } from 'hooks/useTheme';
import { TouchableOpacity } from 'react-native';
import { RouteName, StackNavigation } from 'routes/types';

export const ReadingHeader = () => {
  const { book, openAdjustments } = useReading();
  const { readingTheme } = useTheme();
  const stackNavigation = useNavigation<StackNavigation>();

  return (
    <Header
      title={book?.title!}
      variant={HeaderVariant.Reading}
      leftComponent={
        <TouchableOpacity
          onPress={() =>
            stackNavigation.navigate(RouteName.Home, {
              screen: RouteName.Library,
            })
          }
          style={{
            padding: 4,
          }}>
          <FontAwesome
            name="close"
            size={20}
            color={readingTheme.colors.title}
          />
        </TouchableOpacity>
      }
      rightComponent={
        <TouchableOpacity
          onPress={openAdjustments}
          style={{
            padding: 4,
          }}>
          <FontAwesome
            name="gear"
            size={20}
            color={readingTheme.colors.title}
          />
        </TouchableOpacity>
      }
    />
  );
};

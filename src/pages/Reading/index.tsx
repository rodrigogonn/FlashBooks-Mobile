import { FontAwesome } from '@expo/vector-icons';
import { Header, HeaderVariant } from 'components/Header';
import { useReading } from 'contexts/readingContext/useReading';
import { useTheme } from 'contexts/themeContext';
import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RouteParams } from 'routes';
import { Pages } from './components/Pages';
import { Progress } from './components/Progress';
import { ReadingAdjustments } from './components/ReadingAdjustments';

export const Reading = ({ route: { params } }: RouteParams<'Reading'>) => {
  const [adjustmentsOpen, setAdjustmentsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { changeReadingBook, book } = useReading();
  const { readingTheme } = useTheme();

  useEffect(() => {
    changeReadingBook(params.book);
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: readingTheme.colors.background,
      }}>
      <Header
        title={book?.title!}
        variant={HeaderVariant.Reading}
        rightComponent={
          <TouchableOpacity
            onPress={() => setAdjustmentsOpen(true)}
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

      <View
        style={{
          flex: 1,
        }}>
        <Pages />

        <Progress />
      </View>

      <ReadingAdjustments
        open={adjustmentsOpen}
        onClose={() => setAdjustmentsOpen(false)}
      />
    </View>
  );
};

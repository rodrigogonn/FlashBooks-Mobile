import { FontAwesome5 } from '@expo/vector-icons';
import { ContentType, Page, useBooks } from 'contexts/booksContext';
import { useTheme } from 'contexts/themeContext';
import { useRef, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const pageWidth = Dimensions.get('window').width;

export const Reading = () => {
  const { theme } = useTheme();
  const { library } = useBooks();
  const pages = library[0].pages;
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const carouselRef = useRef<Carousel<Page>>(null);

  return (
    <View
      style={{
        position: 'relative',
      }}>
      <Carousel
        ref={carouselRef}
        onSnapToItem={(index) => setCurrentPageIndex(index)}
        scrollEnabled={false}
        data={pages}
        renderItem={({ item, index }) => (
          <PageComponent
            key={index}
            page={item}
            onNext={async () => {
              if (index < pages.length - 1) {
                carouselRef.current?.snapToNext();
              }
            }}
            onPrevious={() => {
              if (index > 0) {
                carouselRef.current?.snapToPrev();
              }
            }}
            currentPage={index + 1}
            totalPages={pages.length}
          />
        )}
        sliderWidth={pageWidth}
        itemWidth={pageWidth}
      />

      <View
        style={{
          width: '100%',
          height: 6,
          position: 'absolute',
          bottom: 0,
          backgroundColor: theme.colors.reading.progress.background,
        }}>
        <View
          style={{
            width: `${(currentPageIndex + 0.1 / pages.length) * 100}%`,
            height: '100%',
            backgroundColor: theme.colors.reading.progress.fill,
          }}
        />
      </View>
    </View>
  );
};

interface PageProps {
  page: Page;
  onNext: () => void;
  onPrevious: () => void;
  currentPage: number;
  totalPages: number;
}
const PageComponent = ({
  page,
  onNext,
  onPrevious,
  currentPage,
  totalPages,
}: PageProps) => {
  const { theme } = useTheme();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: theme.colors.reading.background,
      }}>
      <View
        style={{
          height: '100%',
          padding: 16,
          paddingBottom: 64,
          flex: 1,
          gap: 16,
        }}>
        <Text
          style={{
            fontFamily: theme.fontFamily.bold,
            fontSize: 24,
            color: theme.colors.reading.title,
          }}>
          {page.title}
        </Text>

        <View
          style={{
            gap: 16,
          }}>
          {page.content.map((content, index) => {
            if (content.type === ContentType.PARAGRAPH) {
              return (
                <Text
                  key={index}
                  style={{
                    fontFamily: theme.fontFamily.regular,
                    fontSize: 16,
                    color: theme.colors.reading.text,
                  }}>
                  {content.text}
                </Text>
              );
            }
          })}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}>
          <TouchableOpacity
            onPress={onPrevious}
            disabled={isFirstPage}
            style={{
              opacity: isFirstPage ? 0 : 1,
              backgroundColor: theme.colors.reading.navigationButton.background,
              padding: 12,
              borderRadius: 12,
            }}>
            <FontAwesome5
              name="arrow-left"
              size={16}
              color={theme.colors.reading.text}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontFamily: theme.fontFamily.regular,
              fontSize: 16,
              color: theme.colors.reading.text,
            }}>
            {currentPage} de {totalPages}
          </Text>

          <TouchableOpacity
            onPress={onNext}
            style={{
              backgroundColor: isLastPage
                ? theme.colors.reading.progress.fill
                : theme.colors.reading.navigationButton.background,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 12,
            }}>
            <FontAwesome5
              name={isLastPage ? 'check' : 'arrow-right'}
              size={16}
              color={theme.colors.reading.text}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

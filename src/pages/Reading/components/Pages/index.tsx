import { Page } from 'contexts/booksContext';
import { useReading } from 'contexts/readingContext/useReading';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { PageComponent } from '../PageComponent';

const pageWidth = Dimensions.get('window').width;

export const Pages = () => {
  const { changePage, book } = useReading();
  const carouselRef = useRef<Carousel<Page>>(null);

  if (!book) return null;

  return (
    <Carousel
      ref={carouselRef}
      onSnapToItem={changePage}
      scrollEnabled={false}
      data={book.pages}
      renderItem={({ item, index }) => (
        <PageComponent
          key={index}
          page={item}
          onNext={async () => {
            if (index < book.pages.length - 1) {
              carouselRef.current?.snapToNext();
            }
          }}
          onPrevious={() => {
            if (index > 0) {
              carouselRef.current?.snapToPrev();
            }
          }}
          currentPage={index + 1}
          totalPages={book.pages.length}
        />
      )}
      sliderWidth={pageWidth}
      itemWidth={pageWidth}
    />
  );
};

import { useReading } from 'hooks/useReading';
import { useRef } from 'react';
import { Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FinishReading } from '../FinishReading';
import { PageComponent } from '../PageComponent';

const pageWidth = Dimensions.get('window').width;

export const Pages = () => {
  const { changePage, book, complete, currentPageIndex } = useReading();
  const carouselRef = useRef<Carousel<number>>(null);

  if (!book) return null;

  return (
    <Carousel
      ref={carouselRef}
      onSnapToItem={changePage}
      firstItem={currentPageIndex}
      scrollEnabled={false}
      getItemLayout={(_, index) => ({
        length: pageWidth,
        offset: pageWidth * index,
        index,
      })}
      data={[...Array(book.chapters.length + 1).keys()]}
      renderItem={({ index }) => {
        const isLastPage = index === book.chapters.length - 1;
        const isFinishPage = index === book.chapters.length;

        if (isFinishPage) {
          return <FinishReading />;
        }

        const chapter = book.chapters[index]!;

        return (
          <PageComponent
            key={index}
            chapter={chapter}
            onNext={async () => {
              carouselRef.current?.snapToItem(index + 1);
              if (isLastPage) {
                complete();
              }
            }}
            onPrevious={() => {
              if (index > 0) {
                carouselRef.current?.snapToItem(index - 1);
              }
            }}
            currentPage={index + 1}
            totalPages={book.chapters.length}
          />
        );
      }}
      sliderWidth={pageWidth}
      itemWidth={pageWidth}
    />
  );
};

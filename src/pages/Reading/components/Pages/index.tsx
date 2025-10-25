import { useReading } from 'hooks/useReading';
import { useRef } from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { FinishReading } from '../FinishReading';
import { PageComponent } from '../PageComponent';

// PagerView cuida do layout de página; não precisamos do width explícito

export const Pages = () => {
  const { changePage, book, complete, currentPageIndex } = useReading();
  const pagerRef = useRef<PagerView>(null);

  if (!book) return null;

  return (
    <PagerView
      ref={pagerRef}
      style={{ flex: 1 }}
      initialPage={currentPageIndex || 0}
      scrollEnabled={false}
      offscreenPageLimit={1}
      onPageSelected={(e) => {
        const pos = e.nativeEvent.position;
        changePage(pos);
      }}>
      {[...Array(book.chapters.length + 1).keys()].map((index) => {
        const isLastPage = index === book.chapters.length - 1;
        const isFinishPage = index === book.chapters.length;

        if (isFinishPage) {
          return <FinishReading key="finish" />;
        }

        const chapter = book.chapters[index]!;
        const isNearCurrent =
          typeof currentPageIndex === 'number'
            ? Math.abs(index - currentPageIndex) <= 1
            : index <= 1;

        if (!isNearCurrent) {
          return <View key={index} style={{ flex: 1 }} />;
        }
        return (
          <PageComponent
            key={index}
            chapter={chapter}
            onNext={async () => {
              // Atualiza estado imediatamente e realiza animação nativa
              // changePage(index + 1);
              pagerRef.current?.setPage(index + 1);
              if (isLastPage) {
                complete();
              }
            }}
            onPrevious={() => {
              if (index > 0) {
                // changePage(index - 1);
                pagerRef.current?.setPage(index - 1);
              }
            }}
            currentPage={index + 1}
            totalPages={book.chapters.length}
          />
        );
      })}
    </PagerView>
  );
};

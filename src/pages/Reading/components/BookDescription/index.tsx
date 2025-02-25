import { Button } from 'components/Button';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from 'components/ReadingTypography';
import { useReading } from 'hooks/useReading';
import { useTheme } from 'hooks/useTheme';
import { PageContainer } from '../PageContainer';
import React, { useMemo } from 'react';
import { BookComponent } from 'components/BookComponent';
import { View } from 'react-native';
import { ContentType } from 'providers/BooksProvider/types';

export const BookDescription = () => {
  const { book, startReading } = useReading();
  const { readingTheme } = useTheme();

  const handleStartReading = () => {
    if (!book) return;

    startReading();
  };

  const readingTimeInMinutes = useMemo(() => {
    if (!book) return 0;

    const WORDS_PER_MINUTE = 200;

    const totalWords = book.chapters.reduce((chapterSum, chapter) => {
      const chapterWords = chapter.content.reduce((contentSum, content) => {
        if (content.type === ContentType.PARAGRAPH) {
          const words = content.text.trim().split(/\s+/).length;
          return contentSum + words;
        }
        return contentSum;
      }, 0);
      const titleWords = chapter.title.trim().split(/\s+/).length;
      return chapterSum + chapterWords + titleWords;
    }, 0);

    return Math.max(1, Math.ceil(totalWords / WORDS_PER_MINUTE));
  }, [book]);

  if (!book) return null;

  return (
    <PageContainer>
      <View
        style={{
          alignItems: 'center',
        }}>
        <BookComponent
          book={book}
          options={{
            withTitle: false,
            size: 'large',
          }}
        />
      </View>

      <View
        style={{
          flex: 1,
          gap: 16,
          paddingBottom: 16,
        }}>
        <View>
          <ReadingTypography
            variant={ReadingTypographyVariant.Title}
            style={{
              textAlign: 'center',
            }}>
            {book.title}
          </ReadingTypography>

          <ReadingTypography
            variant={ReadingTypographyVariant.Small}
            style={{
              textAlign: 'center',
            }}>
            Tempo de leitura: {readingTimeInMinutes}{' '}
            {readingTimeInMinutes === 1 ? 'minuto' : 'minutos'}
          </ReadingTypography>
        </View>

        <ReadingTypography variant={ReadingTypographyVariant.Paragraph}>
          {book.description}
        </ReadingTypography>
      </View>

      <Button
        onPress={handleStartReading}
        style={{
          backgroundColor: readingTheme.colors.button.primary.background,
        }}>
        <ReadingTypography variant={ReadingTypographyVariant.Button}>
          Iniciar leitura
        </ReadingTypography>
      </Button>
    </PageContainer>
  );
};

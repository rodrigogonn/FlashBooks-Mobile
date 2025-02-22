import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'components/IconButton';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from 'components/ReadingTypography';
import { Chapter, ContentType } from 'providers/BooksProvider/types';
import { useTheme } from 'hooks/useTheme';
import { View } from 'react-native';
import { PageContainer } from '../PageContainer';

interface PageProps {
  chapter: Chapter;
  onPrevious: () => void;
  onNext: () => void;
  currentPage: number;
  totalPages: number;
}

export const PageComponent = ({
  chapter,
  onPrevious,
  onNext,
  currentPage,
  totalPages,
}: PageProps) => {
  const { readingTheme } = useTheme();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <PageContainer>
      <ReadingTypography variant={ReadingTypographyVariant.Title}>
        {chapter.title}
      </ReadingTypography>

      <View
        style={{
          gap: 16,
          flexGrow: 1,
        }}>
        {chapter.content.map((content, index) => {
          switch (content.type) {
            case ContentType.PARAGRAPH:
              return (
                <ReadingTypography
                  key={index}
                  variant={ReadingTypographyVariant.Paragraph}>
                  {content.text}
                </ReadingTypography>
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
        <IconButton
          onPress={onPrevious}
          disabled={isFirstPage}
          style={{
            opacity: isFirstPage ? 0 : 1,
            backgroundColor: readingTheme.colors.navigationButton.background,
          }}>
          <FontAwesome5
            name="arrow-left"
            size={16}
            color={readingTheme.colors.text}
          />
        </IconButton>

        <ReadingTypography variant={ReadingTypographyVariant.Paragraph}>
          {currentPage} de {totalPages}
        </ReadingTypography>

        <IconButton
          onPress={onNext}
          style={{
            backgroundColor: isLastPage
              ? readingTheme.colors.button.primary.background
              : readingTheme.colors.navigationButton.background,
          }}>
          <FontAwesome5
            name={isLastPage ? 'check' : 'arrow-right'}
            size={16}
            color={
              isLastPage
                ? readingTheme.colors.button.primary.color
                : readingTheme.colors.text
            }
          />
        </IconButton>
      </View>
    </PageContainer>
  );
};

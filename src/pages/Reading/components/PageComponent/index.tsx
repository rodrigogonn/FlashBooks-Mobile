import { FontAwesome5 } from '@expo/vector-icons';
import { IconButton } from 'components/IconButton';
import { ContentType, Page } from 'contexts/booksContext';
import { useTheme } from 'contexts/themeContext';
import { ScrollView, View } from 'react-native';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from '../ReadingTypography';

interface PageProps {
  page: Page;
  onNext: () => void;
  onPrevious: () => void;
  currentPage: number;
  totalPages: number;
}

export const PageComponent = ({
  page,
  onNext,
  onPrevious,
  currentPage,
  totalPages,
}: PageProps) => {
  const { readingTheme } = useTheme();
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <ScrollView
      style={{
        height: '100%',
        backgroundColor: readingTheme.colors.background,
      }}>
      <View
        style={{
          height: '100%',
          padding: 16,
          paddingBottom: 64,
          flex: 1,
          gap: 16,
        }}>
        <ReadingTypography variant={ReadingTypographyVariant.Title}>
          {page.title}
        </ReadingTypography>

        <View
          style={{
            gap: 16,
          }}>
          {page.content.map((content, index) => {
            if (content.type === ContentType.PARAGRAPH) {
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
                ? readingTheme.colors.progress.fill
                : readingTheme.colors.navigationButton.background,
            }}>
            <FontAwesome5
              name={isLastPage ? 'check' : 'arrow-right'}
              size={16}
              color={readingTheme.colors.text}
            />
          </IconButton>
        </View>
      </View>
    </ScrollView>
  );
};

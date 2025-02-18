import { useNavigation } from '@react-navigation/native';
import { Button } from 'components/Button';
import {
  ReadingTypography,
  ReadingTypographyVariant,
} from 'components/ReadingTypography';
import { useReading } from 'hooks/useReading';
import { useTheme } from 'hooks/useTheme';
import { Linking, View } from 'react-native';
import { RouteName, StackNavigation } from 'routes/types';
import { PageContainer } from '../PageContainer';
import React from 'react';

export const FinishReading = () => {
  const { book } = useReading();
  const { readingTheme } = useTheme();
  const stackNavigation = useNavigation<StackNavigation>();

  if (!book) return null;

  const handleFinish = () => {
    stackNavigation.navigate(RouteName.Home, {
      screen: RouteName.Library,
    });
  };

  return (
    <PageContainer>
      <ReadingTypography variant={ReadingTypographyVariant.Title}>
        Fim da Leitura
      </ReadingTypography>

      <View
        style={{
          flex: 1,
          gap: 16,
        }}>
        <ReadingTypography variant={ReadingTypographyVariant.Paragraph}>
          Parabéns por finalizar o resumo de {book.title}! Esperamos que você
          tenha gostado.
        </ReadingTypography>
        {book.purchaseLink && (
          <>
            <ReadingTypography variant={ReadingTypographyVariant.Paragraph}>
              Quer se aprofundar ainda mais? Compre o livro completo na Amazon:
            </ReadingTypography>
            <ReadingTypography
              variant={ReadingTypographyVariant.Paragraph}
              onPress={() => Linking.openURL(book.purchaseLink!)}>
              {book.purchaseLink}
            </ReadingTypography>
          </>
        )}
        <ReadingTypography variant={ReadingTypographyVariant.Paragraph}>
          Explore mais resumos em nosso app e continue sua jornada de
          aprendizado.
        </ReadingTypography>
      </View>

      <Button
        onPress={handleFinish}
        style={{
          backgroundColor: readingTheme.colors.button.primary.background,
        }}>
        <ReadingTypography variant={ReadingTypographyVariant.Button}>
          Concluir
        </ReadingTypography>
      </Button>
    </PageContainer>
  );
};

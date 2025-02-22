import { PageLayout } from 'components/PageLayout';
import { Typography, TypographyVariant } from 'components/Typography';
import { View } from 'react-native';

export const EmptyLibrary = ({ headerTitle }: { headerTitle: string }) => {
  return (
    <PageLayout header={{ title: headerTitle }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <Typography
          variant={TypographyVariant.Title}
          style={{
            fontSize: 64,
            marginBottom: 16,
          }}>
          📚
        </Typography>
        <Typography
          variant={TypographyVariant.Title}
          style={{
            textAlign: 'center',
          }}>
          Nenhum livro na sua biblioteca
        </Typography>
        <Typography
          variant={TypographyVariant.Body}
          style={{
            textAlign: 'center',
          }}>
          Encontre um livro na aba de explorar e comece a ler. Seus livros serão
          organizados aqui.
        </Typography>
      </View>
    </PageLayout>
  );
};

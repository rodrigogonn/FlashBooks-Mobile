import { useNavigation } from '@react-navigation/native';
import { BookList } from 'components/BookList';
import { PageLayout } from 'components/PageLayout';
import { Book } from 'stores/useBooksStore/types';
import { RouteName, RouteParams, StackNavigation } from 'routes/types';
import { useBooksStore } from 'stores/useBooksStore';
import { useMemo, useState } from 'react';
import { EmptyLibrary } from './components/EmptyLibrary';
import { Modal } from 'components/Modal';
import { Typography, TypographyVariant } from 'components/Typography';
import { Button } from 'components/Button';
import { View } from 'react-native';
import React from 'react';

export const Library = ({}: RouteParams<RouteName.Library>) => {
  const stackNavigation = useNavigation<StackNavigation>();
  const { books, removeFromLibrary } = useBooksStore();

  const [bookMenuContext, setBookMenuContext] = useState<Book>();

  const inProgressBooks = useMemo(() => {
    return books
      .filter((book) => !book.finished && book.lastReadAt)
      .sort(
        (a, b) =>
          new Date(b.lastReadAt!).getTime() - new Date(a.lastReadAt!).getTime()
      );
  }, [books]);

  const finishedBooks = useMemo(() => {
    return books
      .filter((book) => book.finished)
      .sort(
        (a, b) =>
          new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime()
      );
  }, [books]);

  const handleSelectBook = (book: Book) => {
    stackNavigation.navigate(RouteName.Reading, {
      book,
    });
  };

  if (inProgressBooks.length === 0 && finishedBooks.length === 0) {
    return <EmptyLibrary />;
  }

  return (
    <PageLayout header={{ canGoBack: false }}>
      {inProgressBooks.length > 0 && (
        <BookList
          books={inProgressBooks}
          title="Continuar"
          counter={inProgressBooks.length}
          withProgress
          onSelect={handleSelectBook}
          onLongPress={setBookMenuContext}
        />
      )}

      {finishedBooks.length > 0 && (
        <BookList
          books={finishedBooks}
          title="Lidos"
          counter={finishedBooks.length}
          small
          onSelect={handleSelectBook}
          onLongPress={setBookMenuContext}
        />
      )}

      <Modal
        open={!!bookMenuContext}
        onClose={() => setBookMenuContext(undefined)}>
        {!!bookMenuContext && (
          <>
            <Typography
              variant={TypographyVariant.Body}
              style={{
                marginBottom: 16,
              }}>
              Deseja remover o livro "{bookMenuContext.title}" da sua
              biblioteca?
            </Typography>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 16,
              }}>
              <Button onPress={() => setBookMenuContext(undefined)}>
                <Typography variant={TypographyVariant.Button}>
                  Cancelar
                </Typography>
              </Button>
              <Button
                onPress={() => {
                  removeFromLibrary(bookMenuContext.id);
                  setBookMenuContext(undefined);
                }}>
                <Typography variant={TypographyVariant.Button}>
                  Remover
                </Typography>
              </Button>
            </View>
          </>
        )}
      </Modal>
    </PageLayout>
  );
};

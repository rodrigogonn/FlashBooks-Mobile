import { authenticatedApi } from 'core/api/authenticatedApi';
import { Book, BookCollection } from 'providers/BooksProvider/types';

export const booksService = {
  getNotSyncedData: async ({ lastSync }: { lastSync?: string }) => {
    const response = await authenticatedApi.get<{
      books: Book[];
      bookCollections: BookCollection[];
      lastSync: string;
    }>('/api/sync', {
      params: {
        lastSync,
      },
    });

    return response.data;
  },
};

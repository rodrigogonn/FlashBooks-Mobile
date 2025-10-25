import * as FileSystem from 'expo-file-system';
import { Chapter } from 'providers/BooksProvider/types';

const BOOKS_DIR = `${FileSystem.documentDirectory}bookContents`;

async function ensureDir(): Promise<void> {
  const info = await FileSystem.getInfoAsync(BOOKS_DIR);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(BOOKS_DIR, { intermediates: true });
  }
}

function getBookFilePath(bookId: string): string {
  return `${BOOKS_DIR}/${encodeURIComponent(bookId)}.json`;
}

export async function saveBookChapters(
  bookId: string,
  chapters: Chapter[]
): Promise<string> {
  await ensureDir();
  const path = getBookFilePath(bookId);
  await FileSystem.writeAsStringAsync(path, JSON.stringify(chapters));
  return path;
}

export async function loadBookChapters(
  bookId: string
): Promise<Chapter[] | null> {
  try {
    await ensureDir();
    const path = getBookFilePath(bookId);
    const info = await FileSystem.getInfoAsync(path);
    if (!info.exists) return null;
    const content = await FileSystem.readAsStringAsync(path);
    return JSON.parse(content) as Chapter[];
  } catch (e) {
    console.warn('[bookContentStorage] load error', { bookId, e });
    return null;
  }
}

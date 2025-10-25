import { create } from 'zustand';

interface ReadingProgressState {
  currentPageIndex: number;
  setCurrentPageIndex: (index: number) => void;
  reset: () => void;
}

export const useReadingProgressStore = create<ReadingProgressState>((set) => ({
  currentPageIndex: 0,
  setCurrentPageIndex: (index: number) => set({ currentPageIndex: index }),
  reset: () => set({ currentPageIndex: 0 }),
}));

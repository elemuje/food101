import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
          return { theme: newTheme };
        }),
      initTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
      },
    }),
    { name: 'food101-theme' }
  )
);

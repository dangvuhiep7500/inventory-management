import { create } from "zustand"
type State = {
    colorTheme: string | null;
  }
type ThemeStore = {
  toggleTheme: () => void;
  initTheme: () => void;
};

export const useThemeStore = create<ThemeStore & State>((set, get) => ({
  colorTheme: null,

  toggleTheme: () => {
    const { colorTheme } = get();
    if (colorTheme === 'light') {
      set({ colorTheme: 'dark' });
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      set({ colorTheme: 'light' });
      localStorage.setItem('color-theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  },

  // Initialize theme
  initTheme: () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedColorTheme = localStorage.getItem('color-theme');

    if (storedColorTheme === 'dark' || (!storedColorTheme && prefersDarkMode)) {
      set({ colorTheme: 'dark' });
      document.documentElement.classList.add('dark');
    } else {
      set({ colorTheme: 'light' });
      document.documentElement.classList.remove('dark');
    }
  },
}));

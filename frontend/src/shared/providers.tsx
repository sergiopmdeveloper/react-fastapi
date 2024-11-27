import {
  type Theme,
  type ThemeProviderProps,
  type ThemeProviderState,
} from '@/shared/types';
import { createContext, useEffect, useState } from 'react';

const initialState: ThemeProviderState = {
  theme: 'dark',
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

/**
 * Theme provider
 * @param {ThemeProviderProps} props - The theme provider props
 * @param {ReactNode} props.children - The children to render
 * @param {Theme} props.defaultTheme - The default theme
 * @param {string} props.storageKey - The storage key
 */
export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

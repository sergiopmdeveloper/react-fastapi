import { ThemeProviderContext } from '@/shared/providers';
import { useContext } from 'react';

/**
 * Custom hook to get the current theme
 */
export default function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within the ThemeProvider');

  return context;
}

import { createContext, type ReactNode } from 'react';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children, value }: { children: ReactNode; value: ThemeContextValue }) {
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

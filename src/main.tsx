import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { useTheme } from './hooks/useTheme.ts';
import { App } from './App.tsx';
import './index.css';

function Root() {
  const themeValue = useTheme();
  return (
    <ThemeProvider value={themeValue}>
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </StrictMode>,
);

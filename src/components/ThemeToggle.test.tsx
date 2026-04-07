import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext.tsx';
import { ThemeToggle } from './ThemeToggle.tsx';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
  vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches: false }));
});

describe('ThemeToggle', () => {
  it('renders with aria-label', () => {
    const themeValue = { theme: 'light' as const, toggleTheme: vi.fn() };
    render(
      <ThemeProvider value={themeValue}>
        <ThemeToggle />
      </ThemeProvider>,
    );
    expect(screen.getByLabelText('Alternar tema')).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    const toggleMock = vi.fn();
    const themeValue = { theme: 'light' as const, toggleTheme: toggleMock };
    render(
      <ThemeProvider value={themeValue}>
        <ThemeToggle />
      </ThemeProvider>,
    );
    const btn = screen.getByLabelText('Alternar tema');
    fireEvent.click(btn);
    expect(toggleMock).toHaveBeenCalledTimes(1);
  });
});

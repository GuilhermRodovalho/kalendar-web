import { Outlet } from 'react-router';
import { ThemeToggle } from './ThemeToggle.tsx';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-xl">Calendário Litúrgico</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-4 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
      <footer className="border-t border-border px-4 py-3 text-center text-sm text-text-secondary">
        Dados fornecidos pela{' '}
        <a
          href="https://kalendar.guilhermerodovalho.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-text"
        >
          API Kalendar
        </a>
      </footer>
    </div>
  );
}

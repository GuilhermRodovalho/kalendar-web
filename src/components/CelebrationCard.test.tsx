import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CelebrationCard } from './CelebrationCard.tsx';
import type { Celebration } from '../types/api.ts';

describe('CelebrationCard', () => {
  const celebration: Celebration = {
    name: 'Santa Maria, Mãe de Deus',
    grade: 'Solemnity',
    level: 1,
    color: 'white',
    is_feast_of_the_lord: false,
    is_movable: false,
  };

  it('renders celebration name and grade', () => {
    render(<CelebrationCard celebration={celebration} />);
    expect(screen.getByText('Santa Maria, Mãe de Deus')).toBeInTheDocument();
    expect(screen.getByText('Solenidade')).toBeInTheDocument();
  });

  it('renders color name', () => {
    render(<CelebrationCard celebration={celebration} />);
    expect(screen.getByText('Branco')).toBeInTheDocument();
  });

  it('renders feast of the lord badge when true', () => {
    const feast = { ...celebration, is_feast_of_the_lord: true };
    render(<CelebrationCard celebration={feast} />);
    expect(screen.getByText('Festa do Senhor')).toBeInTheDocument();
  });

  it('renders movable badge when true', () => {
    const movable = { ...celebration, is_movable: true };
    render(<CelebrationCard celebration={movable} />);
    expect(screen.getByText('Celebração Móvel')).toBeInTheDocument();
  });

  it('does not render badges when false', () => {
    render(<CelebrationCard celebration={celebration} />);
    expect(screen.queryByText('Festa do Senhor')).not.toBeInTheDocument();
    expect(screen.queryByText('Celebração Móvel')).not.toBeInTheDocument();
  });
});

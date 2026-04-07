import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LiturgicalColorBadge } from './LiturgicalColorBadge.tsx';

describe('LiturgicalColorBadge', () => {
  it('renders with correct aria-label', () => {
    render(<LiturgicalColorBadge color="red" />);
    expect(screen.getByLabelText('Cor litúrgica: Vermelho')).toBeInTheDocument();
  });

  it('renders different colors', () => {
    const { rerender } = render(<LiturgicalColorBadge color="green" />);
    expect(screen.getByLabelText('Cor litúrgica: Verde')).toBeInTheDocument();

    rerender(<LiturgicalColorBadge color="purple" />);
    expect(screen.getByLabelText('Cor litúrgica: Roxo')).toBeInTheDocument();
  });
});

import type { LiturgicalColor } from '../types/api.ts';
import { liturgicalColorMap } from '../config/liturgical-colors.ts';
import { colorNames } from '../config/translations.ts';

interface Props {
  color: LiturgicalColor;
  size?: 'sm' | 'md';
}

export function LiturgicalColorBadge({ color, size = 'sm' }: Props) {
  const colorValue = liturgicalColorMap[color].light.accent;
  const px = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span
      className={`${px} rounded-full inline-block shrink-0 border border-border`}
      style={{ backgroundColor: colorValue }}
      aria-label={`Cor litúrgica: ${colorNames[color]}`}
      role="img"
    />
  );
}

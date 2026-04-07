import type { Celebration } from '../types/api.ts';
import { gradeNames, colorNames } from '../config/translations.ts';
import { LiturgicalColorBadge } from './LiturgicalColorBadge.tsx';

interface Props {
  celebration: Celebration;
}

export function CelebrationCard({ celebration }: Props) {
  return (
    <div className="p-4 border border-border rounded-lg" style={{ backgroundColor: 'var(--liturgical-bg)' }}>
      <h3 className="text-lg font-semibold mb-2">{celebration.name}</h3>
      <p className="text-sm text-text-secondary mb-2">{gradeNames[celebration.grade]}</p>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1">
          <LiturgicalColorBadge color={celebration.color} size="md" />
          <span className="text-sm">{colorNames[celebration.color]}</span>
        </div>
        {celebration.is_feast_of_the_lord && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-bg-secondary border border-border">
            Festa do Senhor
          </span>
        )}
        {celebration.is_movable && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-bg-secondary border border-border">
            Celebração Móvel
          </span>
        )}
      </div>

      {(celebration.missal_page || celebration.prefaces?.length || celebration.common_ref) && (
        <div className="mt-3 pt-3 border-t border-border space-y-1">
          {celebration.missal_page && (
            <p className="text-sm text-text-secondary flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Missal p. {celebration.missal_page}
            </p>
          )}
          {celebration.prefaces && celebration.prefaces.length > 0 && (
            <div className="text-sm text-text-secondary">
              <span className="font-medium">Prefácios: </span>
              {celebration.prefaces.map((p, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  {p.name} (p. {p.page})
                </span>
              ))}
            </div>
          )}
          {celebration.common_ref && (
            <p className="text-sm text-text-secondary">
              Comum: {celebration.common_ref.name} — p. {celebration.common_ref.page}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

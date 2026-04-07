interface Props {
  view: 'monthly' | 'weekly';
  onChange: (view: 'monthly' | 'weekly') => void;
}

export function ViewToggle({ view, onChange }: Props) {
  const base = 'px-3 py-1.5 text-sm rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-ring';
  const active = 'bg-ring text-white';
  const inactive = 'text-text-secondary hover:bg-bg-secondary';

  return (
    <div className="flex gap-1 bg-bg-secondary rounded-lg p-1">
      <button
        className={`${base} ${view === 'monthly' ? active : inactive}`}
        onClick={() => onChange('monthly')}
      >
        Mensal
      </button>
      <button
        className={`${base} ${view === 'weekly' ? active : inactive}`}
        onClick={() => onChange('weekly')}
      >
        Semanal
      </button>
    </div>
  );
}

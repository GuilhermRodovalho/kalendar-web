import { useState } from 'react';
import { useNavigate } from 'react-router';
import { monthNames } from '../config/translations.ts';

interface Props {
  year: number;
  month: number;
}

export function MonthNavigation({ year, month }: Props) {
  const navigate = useNavigate();
  const [editingYear, setEditingYear] = useState(false);
  const [yearInput, setYearInput] = useState(String(year));

  function goToMonth(y: number, m: number) {
    if (m < 1) {
      navigate(`/calendar/${y - 1}/12`);
    } else if (m > 12) {
      navigate(`/calendar/${y + 1}/1`);
    } else {
      navigate(`/calendar/${y}/${m}`);
    }
  }

  function handleYearSubmit() {
    const parsed = parseInt(yearInput, 10);
    if (parsed >= 1963 && parsed <= 9999) {
      navigate(`/calendar/${parsed}/${month}`);
    } else {
      setYearInput(String(year));
    }
    setEditingYear(false);
  }

  return (
    <div className="flex items-center justify-between gap-2">
      <button
        onClick={() => goToMonth(year, month - 1)}
        aria-label="Mês anterior"
        className="p-2 rounded-lg hover:bg-bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="text-center">
        <span className="text-lg font-semibold">{monthNames[month - 1]} </span>
        {editingYear ? (
          <input
            type="number"
            min={1963}
            max={9999}
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            onBlur={handleYearSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleYearSubmit()}
            className="w-20 text-lg font-semibold text-center bg-bg-secondary border border-border rounded px-1 focus:outline-ring"
            autoFocus
          />
        ) : (
          <button
            onClick={() => { setYearInput(String(year)); setEditingYear(true); }}
            className="text-lg font-semibold hover:text-ring transition-colors focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="Editar ano"
          >
            {year}
          </button>
        )}
      </div>

      <button
        onClick={() => goToMonth(year, month + 1)}
        aria-label="Próximo mês"
        className="p-2 rounded-lg hover:bg-bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

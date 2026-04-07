import type { CalendarEntry } from '../types/api.ts';
import { weekdayNames } from '../config/translations.ts';
import { getDaysInMonth, getFirstDayOfMonth, toDateString } from '../utils/date.ts';
import { DayCell } from './DayCell.tsx';

interface Props {
  year: number;
  month: number;
  entries: CalendarEntry[];
}

export function CalendarGrid({ year, month, entries }: Props) {
  const entryMap = new Map<string, CalendarEntry>();
  for (const e of entries) {
    entryMap.set(e.date, e);
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Previous month days
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const cells: React.ReactNode[] = [];

  // Fill leading days from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateStr = toDateString(prevYear, prevMonth, day);
    cells.push(
      <DayCell
        key={`prev-${day}`}
        day={day}
        month={prevMonth}
        year={prevYear}
        entry={entryMap.get(dateStr)}
        isAdjacentMonth
      />,
    );
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = toDateString(year, month, day);
    cells.push(
      <DayCell
        key={day}
        day={day}
        month={month}
        year={year}
        entry={entryMap.get(dateStr)}
      />,
    );
  }

  // Fill trailing days from next month
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  const totalCells = Math.ceil(cells.length / 7) * 7;
  let nextDay = 1;
  while (cells.length < totalCells) {
    const dateStr = toDateString(nextYear, nextMonth, nextDay);
    cells.push(
      <DayCell
        key={`next-${nextDay}`}
        day={nextDay}
        month={nextMonth}
        year={nextYear}
        entry={entryMap.get(dateStr)}
        isAdjacentMonth
      />,
    );
    nextDay++;
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayNames.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-text-secondary py-1">
            {name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells}
      </div>
    </div>
  );
}

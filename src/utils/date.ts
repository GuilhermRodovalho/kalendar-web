import { monthNames, weekdayFullNames } from '../config/translations.ts';

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}

export function formatDatePtBR(dateStr: string): string {
  const { year, month, day } = parseApiDate(dateStr);
  const date = new Date(year, month - 1, day);
  const weekday = weekdayFullNames[date.getDay()];
  const monthName = monthNames[month - 1].toLowerCase();
  return `${weekday}, ${day} de ${monthName} de ${year}`;
}

export function parseApiDate(dateStr: string): { year: number; month: number; day: number } {
  const [yearStr, monthStr, dayStr] = dateStr.split('-');
  return {
    year: parseInt(yearStr, 10),
    month: parseInt(monthStr, 10),
    day: parseInt(dayStr, 10),
  };
}

export function toDateString(year: number, month: number, day: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export function getWeekDates(year: number, month: number, day: number): string[] {
  const date = new Date(year, month - 1, day);
  const dayOfWeek = date.getDay();
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - dayOfWeek);

  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    dates.push(toDateString(d.getFullYear(), d.getMonth() + 1, d.getDate()));
  }
  return dates;
}

export function isToday(dateStr: string): boolean {
  const today = new Date();
  const { year, month, day } = parseApiDate(dateStr);
  return today.getFullYear() === year && today.getMonth() + 1 === month && today.getDate() === day;
}

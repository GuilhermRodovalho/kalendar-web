import { describe, it, expect } from 'vitest';
import {
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDatePtBR,
  parseApiDate,
  toDateString,
  getWeekDates,
  isToday,
} from './date.ts';

describe('getDaysInMonth', () => {
  it('returns 31 for January', () => {
    expect(getDaysInMonth(2026, 1)).toBe(31);
  });

  it('returns 28 for February in non-leap year', () => {
    expect(getDaysInMonth(2026, 2)).toBe(28);
  });

  it('returns 29 for February in leap year', () => {
    expect(getDaysInMonth(2028, 2)).toBe(29);
  });

  it('returns 30 for April', () => {
    expect(getDaysInMonth(2026, 4)).toBe(30);
  });

  it('handles December', () => {
    expect(getDaysInMonth(2026, 12)).toBe(31);
  });
});

describe('getFirstDayOfMonth', () => {
  it('returns correct day of week', () => {
    // April 2026 starts on Wednesday (3)
    expect(getFirstDayOfMonth(2026, 4)).toBe(3);
  });

  it('returns 0 for months starting on Sunday', () => {
    // March 2026 starts on Sunday
    expect(getFirstDayOfMonth(2026, 3)).toBe(0);
  });
});

describe('formatDatePtBR', () => {
  it('formats date in Portuguese', () => {
    const result = formatDatePtBR('2026-04-05');
    expect(result).toBe('Domingo, 5 de abril de 2026');
  });

  it('formats another date correctly', () => {
    const result = formatDatePtBR('2026-01-01');
    expect(result).toBe('Quinta-feira, 1 de janeiro de 2026');
  });
});

describe('parseApiDate', () => {
  it('parses YYYY-MM-DD format', () => {
    expect(parseApiDate('2026-04-05')).toEqual({ year: 2026, month: 4, day: 5 });
  });

  it('parses with leading zeros', () => {
    expect(parseApiDate('2026-01-01')).toEqual({ year: 2026, month: 1, day: 1 });
  });
});

describe('toDateString', () => {
  it('formats with zero padding', () => {
    expect(toDateString(2026, 1, 5)).toBe('2026-01-05');
  });

  it('handles double digit months and days', () => {
    expect(toDateString(2026, 12, 25)).toBe('2026-12-25');
  });
});

describe('getWeekDates', () => {
  it('returns 7 dates', () => {
    const dates = getWeekDates(2026, 4, 1);
    expect(dates).toHaveLength(7);
  });

  it('starts on Sunday', () => {
    const dates = getWeekDates(2026, 4, 1);
    expect(dates[0]).toBe('2026-03-29');
  });

  it('handles week crossing month boundary', () => {
    const dates = getWeekDates(2026, 3, 31);
    expect(dates).toHaveLength(7);
    expect(dates[0]).toBe('2026-03-29');
    expect(dates[6]).toBe('2026-04-04');
  });
});

describe('isToday', () => {
  it('returns true for today', () => {
    const now = new Date();
    const dateStr = toDateString(now.getFullYear(), now.getMonth() + 1, now.getDate());
    expect(isToday(dateStr)).toBe(true);
  });

  it('returns false for other dates', () => {
    expect(isToday('2000-01-01')).toBe(false);
  });
});

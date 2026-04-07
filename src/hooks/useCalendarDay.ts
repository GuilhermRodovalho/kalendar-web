import { useState, useCallback, useMemo, useEffect } from 'react';
import type { CalendarEntry } from '../types/api.ts';
import { getCachedEntries } from './useCalendar.ts';
import { toDateString } from '../utils/date.ts';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function useCalendarDay(year: number, month: number, day: number) {
  const dateStr = toDateString(year, month, day);

  const findInCache = useCallback((): CalendarEntry | undefined => {
    const cached = getCachedEntries(year);
    return cached?.find((e) => e.date === dateStr);
  }, [year, dateStr]);

  const cached = findInCache();
  const initialEntry = cached ?? null;
  const initialLoading = !cached;

  const [entry, setEntry] = useState(initialEntry);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback((signal?: AbortSignal) => {
    const cachedData = findInCache();
    if (cachedData) {
      setEntry(cachedData);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/calendar/${year}/${month}/${day}`, { signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao carregar dados do dia (${res.status})`);
        return res.json();
      })
      .then((data: CalendarEntry) => {
        setEntry(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Erro ao carregar dados do dia');
          setLoading(false);
        }
      });
  }, [year, month, day, findInCache]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, [fetchData]);

  const retry = useCallback(() => fetchData(), [fetchData]);

  return useMemo(() => ({ entry, loading, error, retry }), [entry, loading, error, retry]);
}

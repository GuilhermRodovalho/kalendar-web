import { useState, useCallback, useMemo, useEffect } from "react";
import type { CalendarEntry } from "../types/api.ts";

const cache = new Map<number, CalendarEntry[]>();

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export function getEntriesForMonth(
  entries: CalendarEntry[],
  month: number,
): CalendarEntry[] {
  return entries.filter((e) => {
    const m = parseInt(e.date.split("-")[1], 10);
    return m === month;
  });
}

export function useCalendar(year: number) {
  const cached = cache.get(year);
  const initialEntries = cached ?? [];
  const initialLoading = !cached;

  const [entries, setEntries] = useState(initialEntries);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    (signal?: AbortSignal) => {
      if (cache.has(year)) {
        setEntries(cache.get(year)!);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      fetch(`${API_BASE}/calendar/${year}`, { signal })
        .then((res) => {
          if (!res.ok)
            throw new Error(`Erro ao carregar calendário (${res.status})`);
          return res.json();
        })
        .then((data: CalendarEntry[]) => {
          cache.set(year, data);
          setEntries(data);
          setLoading(false);
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setError(err.message || "Erro ao carregar calendário");
            setLoading(false);
          }
        });
    },
    [year],
  );

  useEffect(() => {
    if (!cache.has(year)) {
      const controller = new AbortController();
      fetchData(controller.signal);
      return () => controller.abort();
    }
  }, [year, fetchData]);

  const retry = useCallback(() => fetchData(), [fetchData]);

  return useMemo(
    () => ({ entries, loading, error, retry }),
    [entries, loading, error, retry],
  );
}

export function getCachedEntries(year: number): CalendarEntry[] | undefined {
  return cache.get(year);
}

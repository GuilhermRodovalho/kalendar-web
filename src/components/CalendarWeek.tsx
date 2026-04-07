import { useNavigate, useSearchParams } from "react-router";
import type { CalendarEntry } from "../types/api.ts";
import {
  weekdayFullNames,
  seasonNames,
  gradeNames,
} from "../config/translations.ts";
import { LiturgicalColorBadge } from "./LiturgicalColorBadge.tsx";
import {
  getWeekDates,
  parseApiDate,
  isToday,
  toDateString,
} from "../utils/date.ts";

interface Props {
  year: number;
  month: number;
  day: number;
  entries: CalendarEntry[];
}

export function CalendarWeek({ year, month, day, entries }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const weekDates = getWeekDates(year, month, day);

  const entryMap = new Map<string, CalendarEntry>();
  for (const e of entries) {
    entryMap.set(e.date, e);
  }

  function goToWeek(offsetInDays: number) {
    // 1. Pega o primeiro dia da semana atual exibida (ex: "2026-04-01")
    const firstDayOfWeek = weekDates[0];
    const { year: wy, month: wm, day: wd } = parseApiDate(firstDayOfWeek);

    // 2. Cria o objeto Date (mês é 0-indexed em JS, por isso o -1)
    const targetDate = new Date(wy, wm - 1, wd);

    // 3. Aplica o offset diretamente (ex: +7 ou -7)
    targetDate.setDate(targetDate.getDate() + offsetInDays);

    const params = new URLSearchParams(searchParams);
    params.set("view", "weekly");
    params.set("_t", Date.now().toString());

    // 4. Extrai os novos valores para a URL
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth() + 1;
    const day = targetDate.getDate();

    // 5. Monta a URL incluindo o DIA
    const targetUrl = `/calendar/${year}/${month}/${day}?${params.toString()}`;

    navigate(targetUrl, { replace: true });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => goToWeek(-7)}
          aria-label="Semana anterior"
          className="p-2 rounded-lg hover:bg-bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goToWeek(7)}
          aria-label="Próxima semana"
          className="p-2 rounded-lg hover:bg-bg-secondary transition-colors focus-visible:outline-2 focus-visible:outline-ring"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {weekDates.map((dateStr) => {
          const { year: dy, month: dm, day: dd } = parseApiDate(dateStr);
          const entry =
            entryMap.get(dateStr) ?? entryMap.get(toDateString(dy, dm, dd));
          const date = new Date(dy, dm - 1, dd);
          const weekday = weekdayFullNames[date.getDay()];
          const today = isToday(dateStr);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => navigate(`/calendar/${dy}/${dm}/${dd}/details`, { state: { fromView: "weekly" } })}
              aria-label={`${dd}, ${weekday}`}
              className={`
                p-3 border border-border rounded-lg cursor-pointer text-left
                hover:bg-bg-secondary transition-colors
                focus-visible:outline-2 focus-visible:outline-ring
                ${today ? "ring-2 ring-ring" : ""}
              `}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg font-semibold">{dd}</span>
                <span className="text-sm text-text-secondary">{weekday}</span>
              </div>
              {entry && (
                <>
                  <div className="flex items-center gap-1 mb-1">
                    <LiturgicalColorBadge color={entry.season_color} />
                    <span className="text-xs text-text-secondary">
                      {seasonNames[entry.season]}
                    </span>
                  </div>
                  {entry.celebrations.map((c, i) => (
                    <div key={i} className="flex flex-wrap gap-x-1 mt-1">
                      <LiturgicalColorBadge color={c.color} />
                      <span className="text-sm">{c.name}</span>
                      <span className="text-xs text-text-secondary shrink-0">
                        ({gradeNames[c.grade]})
                      </span>
                    </div>
                  ))}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

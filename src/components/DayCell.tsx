import { useNavigate } from "react-router";
import type { CalendarEntry } from "../types/api.ts";
import { LiturgicalColorBadge } from "./LiturgicalColorBadge.tsx";
import { isToday } from "../utils/date.ts";

interface Props {
  entry?: CalendarEntry;
  day: number;
  month: number;
  year: number;
  isAdjacentMonth?: boolean;
}

export function DayCell({ entry, day, month, year, isAdjacentMonth }: Props) {
  const navigate = useNavigate();
  const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  const today = isToday(dateStr);
  const color = entry?.celebrations[0]?.color ?? entry?.season_color;
  const celebrationName = entry?.celebrations[0]?.name;

  function handleClick() {
    if (isAdjacentMonth) {
      navigate(`/calendar/${year}/${month}`);
    } else {
      navigate(`/calendar/${year}/${month}/${day}/details`, { state: { fromView: "monthly" } });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`${day} de ${month}/${year}${celebrationName ? `, ${celebrationName}` : ""}`}
      className={`
        min-h-[44px] p-1.5 md:p-2 border border-border rounded-lg cursor-pointer
        transition-colors hover:bg-bg-secondary
        focus-visible:outline-2 focus-visible:outline-ring
        ${isAdjacentMonth ? "opacity-40" : ""}
        ${today ? "ring-2 ring-ring" : ""}
      `}
    >
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium">{day}</span>
        {color && <LiturgicalColorBadge color={color} />}
      </div>
      {celebrationName && !isAdjacentMonth && (
        <p className="hidden md:block text-xs text-text-secondary mt-1 line-clamp-2 text-left">
          {celebrationName}
        </p>
      )}
    </div>
  );
}

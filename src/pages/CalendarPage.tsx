import { useParams, useSearchParams, Navigate } from "react-router";
import { useCalendar } from "../hooks/useCalendar.ts";
import { MonthNavigation } from "../components/MonthNavigation.tsx";
import { ViewToggle } from "../components/ViewToggle.tsx";
import { CalendarGrid } from "../components/CalendarGrid.tsx";
import { CalendarWeek } from "../components/CalendarWeek.tsx";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { ErrorMessage } from "../components/ErrorMessage.tsx";

const LAST_VIEW_KEY = "calendar-last-view";

function getLastView(): "weekly" | "monthly" {
  return (
    (sessionStorage.getItem(LAST_VIEW_KEY) as "weekly" | "monthly") || "monthly"
  );
}

export function CalendarPage() {
  const { year: yearStr, month: monthStr, day: dayStr } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");

  const year = parseInt(yearStr ?? "", 10);
  const month = parseInt(monthStr ?? "", 10);
  const day = dayStr ? parseInt(dayStr, 10) : undefined;

  const isValidParams =
    !isNaN(year) &&
    !isNaN(month) &&
    month >= 1 &&
    month <= 12 &&
    year >= 1963 &&
    year <= 9999;

  const { entries, loading, error, retry } = useCalendar(year);

  if (!isValidParams) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;

  const isWeekly = viewParam === "weekly" || getLastView() === "weekly";
  const weekDay = day ?? new Date().getDate();

  function handleViewChange(newView: "monthly" | "weekly") {
    sessionStorage.setItem(LAST_VIEW_KEY, newView);
    const params = new URLSearchParams(searchParams);
    if (newView === "monthly") {
      params.delete("view");
      if (dayStr) {
        params.delete("view");
      }
    } else {
      params.set("view", "weekly");
    }
    setSearchParams(params);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <MonthNavigation year={year} month={month} />
        <ViewToggle
          view={isWeekly ? "weekly" : "monthly"}
          onChange={handleViewChange}
        />
      </div>

      {isWeekly ? (
        <CalendarWeek
          year={year}
          month={month}
          day={weekDay}
          entries={entries}
        />
      ) : (
        <CalendarGrid year={year} month={month} entries={entries} />
      )}
    </div>
  );
}

import { useParams, Navigate, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import { useCalendarDay } from "../hooks/useCalendarDay.ts";
import { useThemeContext } from "../context/useThemeContext.ts";
import { liturgicalColorMap } from "../config/liturgical-colors.ts";
import { seasonNames, colorNames } from "../config/translations.ts";
import { formatDatePtBR } from "../utils/date.ts";
import { LiturgicalColorBadge } from "../components/LiturgicalColorBadge.tsx";
import { CelebrationCard } from "../components/CelebrationCard.tsx";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import { ErrorMessage } from "../components/ErrorMessage.tsx";

export function DayDetailPage() {
  const { year: yStr, month: mStr, day: dStr } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useThemeContext();

  useEffect(() => {
    const fromView = location.state?.fromView as string | undefined;
    if (fromView === "monthly" || fromView === "weekly") {
      sessionStorage.setItem("calendar-last-view", fromView);
    }
  }, [location.state]);

  const year = parseInt(yStr ?? "", 10);
  const month = parseInt(mStr ?? "", 10);
  const day = parseInt(dStr ?? "", 10);

  const isValidParams =
    !isNaN(year) &&
    !isNaN(month) &&
    !isNaN(day) &&
    year >= 1963 &&
    year <= 9999 &&
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= 31;

  const { entry, loading, error, retry } = useCalendarDay(year, month, day);

  if (!isValidParams) {
    return <Navigate to="/" replace />;
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
  if (!entry)
    return <ErrorMessage message="Data inválida. Verifique o dia informado." />;

  const accentColor = entry.celebrations[0]?.color ?? entry.season_color;
  const colors = liturgicalColorMap[accentColor][theme];

  const style = {
    "--liturgical-accent": colors.accent,
    "--liturgical-bg": colors.bg,
    "--liturgical-text": colors.text,
  } as React.CSSProperties;

  return (
    <div style={style} className="space-y-6">
      <button
        onClick={() => navigate(`/calendar/${year}/${month}`)}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text transition-colors focus-visible:outline-2 focus-visible:outline-ring"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Voltar ao calendário
      </button>

      <div>
        <h2
          className="text-2xl font-semibold"
          style={{ color: "var(--liturgical-accent)" }}
        >
          {formatDatePtBR(entry.date)}
        </h2>
        <div className="flex items-center gap-2 mt-2">
          <LiturgicalColorBadge color={entry.season_color} size="md" />
          <span className="text-text-secondary">
            {seasonNames[entry.season]} — {colorNames[entry.season_color]}
          </span>
        </div>
      </div>

      {(entry.season_missal_page || (entry.season_prefaces && entry.season_prefaces.length > 0)) && (
        <div className="p-4 border border-border rounded-lg bg-bg-secondary space-y-1">
          <h3 className="text-lg font-medium">Próprio do Tempo</h3>
          {entry.season_missal_page && (
            <p className="text-sm text-text-secondary flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              Missal p. {entry.season_missal_page}
            </p>
          )}
          {entry.season_prefaces && entry.season_prefaces.length > 0 && (
            <div className="text-sm text-text-secondary">
              <span className="font-medium">Prefácios: </span>
              {entry.season_prefaces.map((p, i) => (
                <span key={i}>
                  {i > 0 && ', '}
                  {p.name} (p. {p.page})
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {entry.celebrations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-medium">Celebrações</h3>
          {entry.celebrations.map((c, i) => (
            <CelebrationCard key={i} celebration={c} />
          ))}
        </div>
      )}
    </div>
  );
}

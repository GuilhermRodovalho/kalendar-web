import { Routes, Route, Navigate } from "react-router";
import { Layout } from "./components/Layout.tsx";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { DayDetailPage } from "./pages/DayDetailPage.tsx";

function RedirectToCurrentMonth() {
  const now = new Date();
  return (
    <Navigate
      to={`/calendar/${now.getFullYear()}/${now.getMonth() + 1}`}
      replace
    />
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<RedirectToCurrentMonth />} />
        <Route path="calendar/:year/:month/" element={<CalendarPage />} />
        <Route path="calendar/:year/:month/:day" element={<CalendarPage />} />
        <Route
          path="calendar/:year/:month/:day/details"
          element={<DayDetailPage />}
        />
        <Route path="*" element={<RedirectToCurrentMonth />} />
      </Route>
    </Routes>
  );
}

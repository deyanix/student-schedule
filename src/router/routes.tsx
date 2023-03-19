import { RouteObject } from "react-router-dom";
import { CalendarPage } from "../pages/CalendarPage";
import { SchedulePage } from "../pages/SchedulePage";

export const routes: RouteObject[] = [
  { path: "/", element: <CalendarPage /> },
  { path: "/:year/:month", element: <CalendarPage /> },
  { path: "/schedule", element: <SchedulePage /> },
];

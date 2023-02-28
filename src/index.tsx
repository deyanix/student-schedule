import { createRoot } from "react-dom/client";
import * as React from "react";
import { App } from "./App";
import { ScheduleProvider } from "./context/ScheduleProvider";
import { rearrangements, weeks } from "./data/calendar";
import { courses } from "./data/courses";

const rootEl = document.getElementById("app");
const root = createRoot(rootEl!);
root.render(
  <React.StrictMode>
    <ScheduleProvider
      rearrangements={rearrangements}
      weeks={weeks}
      courses={courses}
    >
      <App />
    </ScheduleProvider>
  </React.StrictMode>
);

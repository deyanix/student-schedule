import * as React from "react";
import { Schedule } from "./components/Schedule/Schedule";
import { render } from "./components/Schedule/ScheduleRenderer";

export const App: React.FC = () => {
  return <Schedule />;
};

render();

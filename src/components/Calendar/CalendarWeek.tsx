import * as React from "react";
import { CalendarDay } from "./CalendarDay";

export interface CalendarWeekProps {
  dates: Date[];
}

export const CalendarWeek: React.FC<CalendarWeekProps> = (props) => {
  return (
    <tr>
      {props.dates.map((date) => (
        <CalendarDay key={date.toISOString()} date={date} />
      ))}
    </tr>
  );
};

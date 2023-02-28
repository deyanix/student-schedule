import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getISODay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import _ from "lodash";
import * as React from "react";
import { useMemo, useState } from "react";
import { CalendarWeek } from "./CalendarWeek";

export const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const currentMonthName = useMemo(() => {
    return format(currentMonth, "LLLL yyyy");
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = startOfDay(endOfMonth(start));

    const previousMonthDays = _.times(getISODay(start) - 1)
      .reverse()
      .map((index) => addDays(start, -index - 1));
    const nextMonthDays = _.times(7 - getISODay(end)).map((index) =>
      addDays(end, index + 1)
    );

    const result: Date[] = [];
    result.push(...previousMonthDays);
    for (let date = start; date <= end; date = addDays(date, 1)) {
      result.push(date);
    }
    result.push(...nextMonthDays);

    return _.chunk(result, 7);
  }, [currentMonth]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
          &lt;
        </button>
        <span>{currentMonthName}</span>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          &gt;
        </button>
      </div>
      <table style={{ border: "2px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>MO</th>
            <th>TU</th>
            <th>WE</th>
            <th>TH</th>
            <th>FR</th>
            <th>SA</th>
            <th>SU</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((dates) => (
            <CalendarWeek key={dates[0].toISOString()} dates={dates} />
          ))}
        </tbody>
      </table>
    </>
  );
};

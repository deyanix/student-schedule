import {
  addDays,
  addMonths,
  endOfMonth,
  format,
  getISODay,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "date-fns";
import _ from "lodash";
import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CalendarWeek } from "./CalendarWeek";
import {
  CalendarDay,
  CalendarService,
} from "../../../api/Calendar/CalendarService";

export const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [, setLoading] = useState<boolean>(false);

  const currentMonthName = useMemo(() => {
    return format(currentMonth, "LLLL yyyy");
  }, [currentMonth]);

  const getCalendarDay = useCallback(
    (date: Date) => {
      return (
        calendarDays.find((d) => isSameDay(d.date, date)) ?? {
          date,
          rearrangedWeekDay: null,
          type: null,
        }
      );
    },
    [calendarDays]
  );

  const weeks: CalendarDay[][] = useMemo(() => {
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

    return _.chunk(result.map(getCalendarDay), 7);
  }, [currentMonth, getCalendarDay]);

  useEffect(() => {
    setLoading(true);
    CalendarService.getCalendar()
      .then((days) => setCalendarDays(days))
      .finally(() => setLoading(false));
  }, []);

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
            <CalendarWeek key={dates[0].date.toISOString()} dates={dates} />
          ))}
        </tbody>
      </table>
    </>
  );
};

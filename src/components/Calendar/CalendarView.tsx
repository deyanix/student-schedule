import {
  addDays,
  endOfMonth,
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

export interface CalendarViewProps {
  month: Date;
}

export const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [, setLoading] = useState<boolean>(false);

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
    const start = startOfMonth(props.month);
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
  }, [props.month, getCalendarDay]);

  useEffect(() => {
    setLoading(true);
    CalendarService.getCalendar()
      .then((days) => setCalendarDays(days))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
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

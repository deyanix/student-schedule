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
import styled from "styled-components";
import { transparentize } from "polished";

export const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  background: ${(props) => transparentize(0.8, props.theme.primary)};
  border-radius: 8px;
  padding: 16px;
  gap: 8px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    gap: 2px;
  }
`;

export const CalendarHeaderCell = styled.div`
  font-size: 1.1em;
  font-weight: 700;
  padding: 16px 8px;
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 8px 4px;
  }
`;

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
    <StyledTable>
      <CalendarHeaderCell>MON</CalendarHeaderCell>
      <CalendarHeaderCell>TUE</CalendarHeaderCell>
      <CalendarHeaderCell>WED</CalendarHeaderCell>
      <CalendarHeaderCell>THU</CalendarHeaderCell>
      <CalendarHeaderCell>FRI</CalendarHeaderCell>
      <CalendarHeaderCell>SAT</CalendarHeaderCell>
      <CalendarHeaderCell>SUN</CalendarHeaderCell>
      {weeks.map((dates) => (
        <CalendarWeek key={dates[0].date.toISOString()} dates={dates} />
      ))}
    </StyledTable>
  );
};

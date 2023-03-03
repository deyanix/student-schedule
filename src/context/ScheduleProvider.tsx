import * as React from "react";
import { useCallback, useMemo } from "react";
import { ScheduleContext, ScheduleDay } from "./ScheduleContext";
import {
  CalendarDayType,
  CalendarRearrangement,
  CalendarWeek,
  CalendarWeekday,
  ScheduleDayType,
} from "../models/Calendar";
import {
  ClassOccurrence,
  ClassWeeklyOccurrence,
  Course,
  CourseClass,
} from "../models/Course";
import {
  addDays,
  compareAsc,
  isAfter,
  isSameDay,
  isWithinInterval,
  max,
  min,
  nextDay,
  startOfDay,
} from "date-fns";
import _ from "lodash";

export interface ScheduleProviderProps {
  rearrangements: CalendarRearrangement[];
  weeks: CalendarWeek[];
  courses: Course[];
}

export const ScheduleProvider: React.FC<
  React.PropsWithChildren<ScheduleProviderProps>
> = (props) => {
  const getScheduleDay = useCallback(
    (date: Date): ScheduleDay | undefined => {
      const week = props.weeks.find(
        (week) =>
          isWithinInterval(date, week) ||
          isSameDay(date, week.start) ||
          isSameDay(date, week.end)
      );
      if (_.isNil(week)) {
        return undefined;
      }

      const rearrangement = props.rearrangements.find((r) =>
        isSameDay(r.date, date)
      );

      return {
        date,
        type: week.type,
        rearrangement: rearrangement?.weekday,
      };
    },
    [props.weeks, props.rearrangements]
  );

  const startSemester = useMemo(() => {
    return startOfDay(min(props.weeks.map((w) => w.start)));
  }, [props.weeks]);

  const endSemester = useMemo(() => {
    return startOfDay(max(props.weeks.map((w) => w.end)));
  }, [props.weeks]);

  const nextRearrangedDay = useCallback(
    (date: Date, weekday: CalendarWeekday): Date | undefined => {
      return (
        _.chain(props.rearrangements)
          .filter((r) => r.weekday === weekday && isAfter(r.date, date))
          .map((r) => r.date)
          .sort((r1, r2) => compareAsc(r1, r2))
          .first()
          .value() ?? undefined
      );
    },
    [props.rearrangements]
  );

  const matchScheduleDay = useCallback(
    (date: Date, weekday: CalendarWeekday, type?: CalendarDayType): boolean => {
      const scheduleDay = getScheduleDay(date);
      return (
        !_.isNil(scheduleDay) &&
        (_.isNil(type) ||
          scheduleDay.type === type ||
          scheduleDay.type === "ODD-EVEN") &&
        (_.isNil(scheduleDay.rearrangement) ||
          scheduleDay.rearrangement === weekday)
      );
    },
    [getScheduleDay]
  );

  const nextScheduleDay = useCallback(
    (
      date: Date,
      weekday: CalendarWeekday,
      type?: ScheduleDayType
    ): Date | undefined => {
      let currentDate = max([date, addDays(startSemester, -1)]);
      for (;;) {
        const rearrangedDay = nextRearrangedDay(currentDate, weekday);
        currentDate = nextDay(currentDate, weekday);
        if (
          _.isDate(rearrangedDay) &&
          isAfter(currentDate, rearrangedDay) &&
          isAfter(endSemester, rearrangedDay)
        ) {
          return rearrangedDay;
        }
        if (isAfter(currentDate, endSemester)) {
          break;
        }
        if (matchScheduleDay(currentDate, weekday, type)) {
          return currentDate;
        }
      }
    },
    [matchScheduleDay, nextRearrangedDay, startSemester, endSemester]
  );

  const firstScheduleDay = useCallback(
    (weekday: CalendarWeekday, type?: ScheduleDayType) => {
      return nextScheduleDay(new Date(0), weekday, type);
    },
    [nextScheduleDay]
  );

  const getWeeklyOccurrences = useCallback(
    (data: ClassWeeklyOccurrence): Date[] => {
      const result = [];
      let date: Date | undefined = firstScheduleDay(data.day, data.week);
      for (let i = 0; i < 50; i++) {
        if (_.isNil(date)) {
          break;
        }
        result.push(date);
        date = nextScheduleDay(date, data.day, data.week);
      }
      return result;
    },
    [nextScheduleDay]
  );

  const getOccurrences = useCallback(
    (data: ClassOccurrence): Date[] => {
      if (data.type === "WEEKLY") {
        return getWeeklyOccurrences(data);
      } else if (data.type === "SELECTED") {
        return data.dates.map((d) => d.date);
      } else {
        return [];
      }
    },
    [getWeeklyOccurrences]
  );

  const getClassOccurrences = useCallback(
    (data: CourseClass): Date[] => {
      return _.chain(data.occurrences)
        .flatMap((o) => getOccurrences(o))
        .map((d) => startOfDay(d))
        .uniq()
        .value();
    },
    [getOccurrences]
  );

  return (
    <ScheduleContext.Provider value={{ ...props, getScheduleDay }}>
      {props.children}
    </ScheduleContext.Provider>
  );
};

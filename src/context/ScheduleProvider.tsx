import * as React from "react";
import { useCallback } from "react";
import { ScheduleContext, ScheduleDay } from "./ScheduleContext";
import { CalendarRearrangement, CalendarWeek } from "../models/Calendar";
import { Course } from "../models/Course";
import { isSameDay, isWithinInterval } from "date-fns";
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
      const week = props.weeks.find((week) => isWithinInterval(date, week));
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

  return (
    <ScheduleContext.Provider value={{ ...props, getScheduleDay }}>
      {props.children}
    </ScheduleContext.Provider>
  );
};

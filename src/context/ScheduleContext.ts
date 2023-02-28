import { createContext, useContext } from "react";
import {
  CalendarDayType,
  CalendarRearrangement,
  CalendarWeek,
  CalendarWeekday,
} from "../models/Calendar";
import { Course } from "../models/Course";

export interface ScheduleDay {
  date: Date;
  type: CalendarDayType;
  rearrangement?: CalendarWeekday;
}

export interface ScheduleConsumer {
  rearrangements: CalendarRearrangement[];
  weeks: CalendarWeek[];
  courses: Course[];
  getScheduleDay(date: Date): ScheduleDay | undefined;
}

export const ScheduleContext = createContext<ScheduleConsumer>({
  rearrangements: [],
  weeks: [],
  courses: [],
  getScheduleDay: () => undefined,
});

export function useSchedule(): ScheduleConsumer {
  return useContext(ScheduleContext);
}

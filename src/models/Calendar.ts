export enum CalendarWeekday {
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
  SUNDAY = 0,
}

export interface CalendarRearrangement {
  date: Date;
  weekday: CalendarWeekday;
}

export type ScheduleDayType = "ODD" | "EVEN";

export type CalendarDayType = ScheduleDayType | "ODD-EVEN";

export interface CalendarWeek {
  start: Date;
  end: Date;
  type: CalendarDayType;
}

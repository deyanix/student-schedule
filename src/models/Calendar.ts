export type CalendarWeekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface CalendarRearrangement {
  date: Date;
  weekday: CalendarWeekday;
}

export type CalendarDayType = "ODD" | "EVEN" | "ODD-EVEN";

export interface CalendarWeek {
  start: Date;
  end: Date;
  type: CalendarDayType;
}

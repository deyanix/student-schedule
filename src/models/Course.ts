import { CalendarWeekday, ScheduleDayType } from "./Calendar";

export interface Course {
  name: string;
  classes: CourseClass[];
}

export interface CourseClass {
  type: CourseClassType;
  occurrences: ClassOccurrence[];
}

export enum CourseClassType {
  LECTURE,
  TUTORIAL,
  INTEGRATED,
  LABORATORY,
  PROJECT,
}

export type ClassOccurrence = ClassWeeklyOccurrence | ClassSelectedOccurrence;

export interface ClassBaseOccurrence {
  day: CalendarWeekday;
  description?: string;
  start: Date;
  end: Date;
}

export interface ClassWeeklyOccurrence extends ClassBaseOccurrence {
  type: "WEEKLY";
  week?: ScheduleDayType;
}

export interface ClassSelectedOccurrence extends ClassBaseOccurrence {
  type: "SELECTED";
  dates: ClassSelectedOccurrenceDate[];
}

export interface ClassSelectedOccurrenceDate {
  date: Date;
  description?: string;
}

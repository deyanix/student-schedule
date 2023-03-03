import {
  CalendarRearrangement,
  CalendarWeek,
  CalendarWeekday,
} from "../models/Calendar";
import { parseDate } from "./courses";

export const rearrangements: CalendarRearrangement[] = [
  { date: parseDate("2023-04-05"), weekday: CalendarWeekday.FRIDAY },
  { date: parseDate("2023-06-06"), weekday: CalendarWeekday.FRIDAY },
];

export const weeks: CalendarWeek[] = [
  {
    start: parseDate("2023-02-20"),
    end: parseDate("2023-02-24"),
    type: "ODD-EVEN",
  },
  {
    start: parseDate("2023-02-27"),
    end: parseDate("2023-03-03"),
    type: "ODD",
  },
  {
    start: parseDate("2023-03-06"),
    end: parseDate("2023-03-10"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-03-13"),
    end: parseDate("2023-03-17"),
    type: "ODD",
  },
  {
    start: parseDate("2023-03-20"),
    end: parseDate("2023-03-24"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-03-27"),
    end: parseDate("2023-03-31"),
    type: "ODD",
  },
  {
    start: parseDate("2023-04-03"),
    end: parseDate("2023-04-06"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-04-11"),
    end: parseDate("2023-04-14"),
    type: "ODD",
  },
  {
    start: parseDate("2023-04-17"),
    end: parseDate("2023-04-21"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-04-24"),
    end: parseDate("2023-04-28"),
    type: "ODD",
  },
  {
    start: parseDate("2023-05-08"),
    end: parseDate("2023-05-11"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-05-15"),
    end: parseDate("2023-05-19"),
    type: "ODD",
  },
  {
    start: parseDate("2023-05-22"),
    end: parseDate("2023-05-26"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-05-29"),
    end: parseDate("2023-06-02"),
    type: "ODD",
  },
  {
    start: parseDate("2023-06-05"),
    end: parseDate("2023-06-07"),
    type: "EVEN",
  },
  {
    start: parseDate("2023-06-12"),
    end: parseDate("2023-06-12"),
    type: "ODD",
  },
  {
    start: parseDate("2023-06-13"),
    end: parseDate("2023-06-16"),
    type: "EVEN",
  },
];

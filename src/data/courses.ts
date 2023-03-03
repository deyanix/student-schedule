import { Course, CourseClassType } from "../models/Course";
import { parse } from "date-fns";
import { CalendarWeekday } from "../models/Calendar";

export function parseDate(date: string): Date {
  return parse(date, "yyyy-MM-dd", new Date(0));
}

export function parseTime(time: string): Date {
  return parse(time, "HH:mm", new Date(0));
}

export const courses: Course[] = [
  {
    name: "Wireless Transmission and Antennas",
    classes: [
      {
        type: CourseClassType.INTEGRATED,
        occurrences: [
          {
            type: "WEEKLY",
            week: "ODD",
            day: CalendarWeekday.MONDAY,
            start: parseTime("10:15"),
            end: parseTime("12:00"),
          },
        ],
      },
      {
        type: CourseClassType.LABORATORY,
        occurrences: [
          {
            type: "SELECTED",
            day: CalendarWeekday.TUESDAY,
            start: parseTime("14:15"),
            end: parseTime("17:00"),
            dates: [
              { date: parseDate("2023-03-07"), description: "TB4" },
              { date: parseDate("2023-03-14"), description: "TB2" },
              { date: parseDate("2023-03-28"), description: "TB6" },
              { date: parseDate("2023-04-04"), description: "TB1" },
              { date: parseDate("2023-04-18"), description: "TB5" },
              { date: parseDate("2023-04-25"), description: "TB3" },
            ],
          },
        ],
      },
      {
        type: CourseClassType.LECTURE,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("12:15"),
            end: parseTime("14:00"),
          },
        ],
      },
    ],
  },
  {
    name: "Fields and Waves",
    classes: [
      {
        type: CourseClassType.LECTURE,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.TUESDAY,
            start: parseTime("18:15"),
            end: parseTime("20:00"),
          },
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("14:15"),
            end: parseTime("16:00"),
          },
        ],
      },
      {
        type: CourseClassType.LABORATORY,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.MONDAY,
            start: parseTime("10:15"),
            end: parseTime("13:00"),
          },
        ],
      },
    ],
  },
  {
    name: "Electronic Circuits",
    classes: [
      {
        type: CourseClassType.LECTURE,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.MONDAY,
            start: parseTime("13:15"),
            end: parseTime("15:00"),
          },
        ],
      },
      {
        type: CourseClassType.TUTORIAL,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.TUESDAY,
            start: parseTime("13:15"),
            end: parseTime("14:00"),
          },
        ],
      },
      {
        type: CourseClassType.LABORATORY,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.THURSDAY,
            start: parseTime("14:15"),
            end: parseTime("17:00"),
          },
        ],
      },
    ],
  },
  {
    name: "Team Project 2",
    classes: [
      {
        type: CourseClassType.PROJECT,
        occurrences: [
          {
            type: "SELECTED",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("16:15"),
            end: parseTime("18:00"),
            dates: [
              {
                date: parseDate("2023-06-14"),
                description: "Final presentation",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "English",
    classes: [
      {
        type: CourseClassType.TUTORIAL,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("10:15"),
            end: parseTime("11:45"),
          },
          {
            type: "WEEKLY",
            day: CalendarWeekday.FRIDAY,
            start: parseTime("10:15"),
            end: parseTime("11:45"),
          },
        ],
      },
    ],
  },
  {
    name: "Computing in Enginerring",
    classes: [
      {
        type: CourseClassType.INTEGRATED,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.FRIDAY,
            start: parseTime("8:15"),
            end: parseTime("10:00"),
          },
        ],
      },
      {
        type: CourseClassType.PROJECT,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("16:15"),
            end: parseTime("18:00"),
          },
        ],
      },
    ],
  },
  {
    name: "Computer Systems",
    classes: [
      {
        type: CourseClassType.LECTURE,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.FRIDAY,
            start: parseTime("10:15"),
            end: parseTime("12:00"),
          },
        ],
      },
      {
        type: CourseClassType.PROJECT,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("11:15"),
            end: parseTime("12:00"),
          },
        ],
      },
      {
        type: CourseClassType.LABORATORY,
        occurrences: [
          {
            type: "SELECTED",
            day: CalendarWeekday.FRIDAY,
            start: parseTime("12:15"),
            end: parseTime("16:00"),
            dates: [
              { date: parseDate("2023-03-10"), description: "Laboratory 1" },
              { date: parseDate("2023-04-05"), description: "Laboratory 2" },
              { date: parseDate("2023-05-19"), description: "Laboratory 3" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "User Interface Design",
    classes: [
      {
        type: CourseClassType.LECTURE,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.THURSDAY,
            start: parseTime("10:15"),
            end: parseTime("12:00"),
          },
        ],
      },
      {
        type: CourseClassType.TUTORIAL,
        occurrences: [
          {
            type: "WEEKLY",
            day: CalendarWeekday.WEDNESDAY,
            start: parseTime("8:30"),
            end: parseTime("10:00"),
          },
        ],
      },
    ],
  },
  {
    name: "Basics of Multimedia",
    classes: [
      {
        type: CourseClassType.TUTORIAL,
        occurrences: [
          {
            type: "SELECTED",
            day: CalendarWeekday.TUESDAY,
            start: parseTime("10:15"),
            end: parseTime("13:00"),
            dates: [
              { date: parseDate("2023-03-07"), description: "C1" },
              { date: parseDate("2023-04-18"), description: "C2" },
            ],
          },
        ],
      },
      {
        type: CourseClassType.LABORATORY,
        occurrences: [
          {
            type: "SELECTED",
            day: CalendarWeekday.TUESDAY,
            start: parseTime("10:15"),
            end: parseTime("13:00"),
            dates: [
              { date: parseDate("2023-03-14"), description: "L1" },
              { date: parseDate("2023-03-28"), description: "L2" },
              { date: parseDate("2023-04-25"), description: "L3" },
              { date: parseDate("2023-05-16"), description: "L4" },
              { date: parseDate("2023-05-30"), description: "L5" },
            ],
          },
        ],
      },
    ],
  },
];

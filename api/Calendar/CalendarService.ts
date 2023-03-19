import { ScheduleDayType } from "../Schedule/ScheduleService";
import { AxiosResponse } from "axios";
import { api } from "../index";
import _ from "lodash";
import { AxiosRequestConfig } from "axios";

export type CalendarDayType = ScheduleDayType | "ODD_EVEN";

export type CalendarWeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export const CalendarISOWeekDay: Record<CalendarWeekDay, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 0,
};

export interface CalendarDay {
  date: Date;
  type: CalendarDayType | null;
  rearrangedWeekDay: CalendarWeekDay | null;
}

export const CalendarService = {
  getISOWeekDay(weekDay: CalendarWeekDay): number {
    return CalendarISOWeekDay[weekDay];
  },
  deserializeCalendarDay(data: CalendarDay): CalendarDay {
    return _.chain(data).set("date", new Date(data.date)).value();
  },
  deserializeCalendarDays(data: CalendarDay[]): CalendarDay[] {
    return data.map((d) => this.deserializeCalendarDay(d));
  },
  async getCalendar(config?: AxiosRequestConfig): Promise<CalendarDay[]> {
    const response: AxiosResponse<CalendarDay[]> = await api.get(
      "/calendar",
      config
    );
    return this.deserializeCalendarDays(response.data);
  },
};

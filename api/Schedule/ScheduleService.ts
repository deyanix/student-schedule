import { api } from "../index";
import { format } from "date-fns";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import _ from "lodash";
import { CalendarWeekDay } from "../Calendar/CalendarService";

export type ClassType =
  | "LECTURE"
  | "TUTORIAL"
  | "INTEGRATED"
  | "LABORATORY"
  | "PROJECT";

export type ScheduleDayType = "ODD" | "EVEN";

export interface ScheduleModel {
  date: Date;
  type: ScheduleDayType | null;
  rearrangedWeekDay: CalendarWeekDay | null;
  occurrences: ScheduleOccurrence[];
}

export interface ScheduleOccurrence {
  courseId: number;
  name: string;
  classId: number;
  type: ClassType;
  title: string;
  start: Date;
  end: Date;
}

export const ScheduleService = {
  deserializeScheduleOccurrence(data: ScheduleOccurrence): ScheduleOccurrence {
    return _.chain(data)
      .set("start", new Date(data.start))
      .set("end", new Date(data.end))
      .value();
  },
  deserializeSchedule(data: ScheduleModel): ScheduleModel {
    return _.chain(data)
      .set("date", new Date(data.date))
      .set(
        "occurrences",
        data.occurrences.map((o) => this.deserializeScheduleOccurrence(o))
      )
      .value();
  },
  deserializeSchedules(data: ScheduleModel[]): ScheduleModel[] {
    return data.map((s) => this.deserializeSchedule(s));
  },
  async getWeek(
    date: Date,
    config?: AxiosRequestConfig
  ): Promise<ScheduleModel[]> {
    const response: AxiosResponse<ScheduleModel[]> = await api.get(
      "/schedule/week",
      _.merge(
        {
          params: {
            date: format(date, "yyyy-MM-dd"),
          },
        },
        config
      )
    );
    return this.deserializeSchedules(response.data);
  },
};

import * as React from "react";
import { useMemo } from "react";
import { ScheduleDay, useSchedule } from "../../context/ScheduleContext";
import { CalendarWeekday } from "../../models/Calendar";

export interface CalendarDayProps {
  date: Date | undefined;
}

export const CalendarDay: React.FC<CalendarDayProps> = (props) => {
  const { getScheduleDay } = useSchedule();

  const scheduleDay = useMemo<ScheduleDay | undefined>(
    () => props.date && getScheduleDay(props.date),
    [props.date]
  );

  return (
    <td
      style={{
        width: "50px",
        height: "50px",
        verticalAlign: "middle",
        textAlign: "center",
        border: "1px solid black",
        backgroundColor:
          scheduleDay?.type === "ODD-EVEN"
            ? "#00B0B0"
            : scheduleDay?.type === "ODD"
            ? "#00B050"
            : scheduleDay?.type === "EVEN"
            ? "#8DACFF"
            : "",
      }}
    >
      {props.date?.getDate()}
      {scheduleDay?.rearrangement && (
        <sup style={{ fontWeight: "bold" }}>
          {CalendarWeekday[scheduleDay.rearrangement].substring(0, 2)}
        </sup>
      )}
    </td>
  );
};

import * as React from "react";
import { CalendarDay } from "../../../api/Calendar/CalendarService";

export interface CalendarDayProps {
  date: CalendarDay;
}

export const CalendarDayView: React.FC<CalendarDayProps> = (props) => {
  return (
    <td
      style={{
        width: "50px",
        height: "50px",
        verticalAlign: "middle",
        textAlign: "center",
        border: "1px solid black",
        backgroundColor:
          props.date.type === "ODD_EVEN"
            ? "#00B0B0"
            : props.date.type === "ODD"
            ? "#00B050"
            : props.date.type === "EVEN"
            ? "#8DACFF"
            : "",
      }}
    >
      {props.date.date.getDate()}
      {props.date.rearrangedWeekDay && (
        <sup style={{ fontWeight: "bold" }}>
          {props.date.rearrangedWeekDay.substring(0, 2)}
        </sup>
      )}
    </td>
  );
};

import * as React from "react";
import { useMemo } from "react";
import {
  CalendarDay,
  CalendarDayType,
} from "../../../api/Calendar/CalendarService";
import styled from "styled-components";
import { adjustHue, darken, saturate, transparentize } from "polished";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export interface CalendarCellProps {
  dayType: CalendarDayType | null;
}

export const CalendarDayCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const CalendarDayButton = styled(Link)<CalendarCellProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 64px;
  height: 64px;

  text-decoration: none;
  font-size: 1.2em;
  color: ${(props) =>
    props.dayType === "ODD_EVEN"
      ? darken(0.2, saturate(3, adjustHue(-30, props.theme.primary))) //"#00B0B0"
      : props.dayType === "ODD"
      ? darken(0.2, saturate(0.5, props.theme.primary)) //"#00B050"
      : props.dayType === "EVEN"
      ? darken(0.2, adjustHue(30, saturate(0.5, props.theme.primary))) //"#8DACFF"
      : "#4d4d4d"};

  &:hover {
    background-color: ${(props) =>
      props.dayType === "ODD_EVEN"
        ? transparentize(0.8, saturate(3, adjustHue(-30, props.theme.primary))) //"#00B0B0"
        : props.dayType === "ODD"
        ? transparentize(0.8, saturate(0.5, props.theme.primary)) //"#00B050"
        : props.dayType === "EVEN"
        ? transparentize(0.8, adjustHue(30, saturate(0.5, props.theme.primary))) //"#8DACFF"
        : transparentize(0.8, "#4d4d4d")};
    border-radius: 50%;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    width: 16px;
    height: 16px;
  }
`;

export interface CalendarDayProps {
  day: CalendarDay;
}

export const CalendarDayView: React.FC<CalendarDayProps> = (props) => {
  const routeLocation = useMemo<string>(
    () => `/schedule?date=${format(props.day.date, "yyyy-MM-dd")}`,
    [props.day]
  );

  return (
    <CalendarDayCell>
      <CalendarDayButton dayType={props.day.type} to={routeLocation}>
        {props.day.date.getDate()}
        {props.day.rearrangedWeekDay && (
          <sup style={{ fontWeight: "bold" }}>
            {props.day.rearrangedWeekDay.substring(0, 2)}
          </sup>
        )}
      </CalendarDayButton>
    </CalendarDayCell>
  );
};

import React, { useMemo } from "react";
import { CalendarView } from "../components/Calendar/CalendarView";
import { addMonths, format, startOfMonth } from "date-fns";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

export const CalendarPage: React.FC = () => {
  const params = useParams();
  const currentMonth = useMemo<Date>(() => {
    if (!_.isNil(params.year) && !_.isNil(params.month)) {
      const year = parseInt(params.year);
      const month = parseInt(params.month);
      if (!_.isNaN(year) && !_.isNaN(month)) {
        return new Date(year, month - 1, 1);
      }
    }

    return startOfMonth(new Date());
  }, [params]);

  const currentMonthName = useMemo(() => {
    return format(currentMonth, "LLLL yyyy");
  }, [currentMonth]);

  const previousUrl = useMemo(
    () => format(addMonths(currentMonth, -1), "/yyyy/MM"),
    [currentMonth]
  );

  const nextUrl = useMemo(
    () => format(addMonths(currentMonth, 1), "/yyyy/MM"),
    [currentMonth]
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={previousUrl}>&lt;</Link>
        <span>{currentMonthName}</span>
        <Link to={nextUrl}>&gt;</Link>
      </div>
      <CalendarView month={currentMonth} />
    </div>
  );
};

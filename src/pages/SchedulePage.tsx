import { Schedule } from "../components/Schedule/Schedule";
import React, { useCallback, useMemo } from "react";
import { addDays, format, parse, startOfISOWeek, startOfMonth } from "date-fns";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import {
  CalendarHeader,
  CalendarHeaderContainer,
  CalendarHeaderTitle,
  CalendarSubheaderTitle,
} from "./CalendarPage";
import { FlatButton } from "../components/Utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { faCalendar } from "@fortawesome/free-solid-svg-icons/faCalendar";

export const SchedulePage: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const date = useMemo<Date>(() => {
    const queryDate = params.get("date");
    if (!_.isNil(queryDate)) {
      return parse(queryDate, "yyyy-MM-dd", startOfMonth(new Date()));
    }

    return startOfISOWeek(new Date());
  }, [params]);

  const dates = useMemo(() => {
    const start = startOfISOWeek(date);
    return _.times(5).map((i) => addDays(start, i));
  }, [date]);

  const onNextClick = useCallback(() => {
    navigate(
      `/schedule?date=${format(
        addDays(startOfISOWeek(date), 7),
        "yyyy-MM-dd"
      )}`,
      { replace: true }
    );
  }, [date]);

  const onPreviousClick = useCallback(() => {
    navigate(
      `/schedule?date=${format(
        addDays(startOfISOWeek(date), -7),
        "yyyy-MM-dd"
      )}`,
      { replace: true }
    );
  }, [date]);

  const onCalendarClick = useCallback(() => {
    navigate(`/calendar?date=${format(date, "yyyy-MM")}`);
  }, [date]);

  const currentMonthName = useMemo(() => {
    return format(date, "LLLL yyyy");
  }, [date]);

  const currentWeek = useMemo(() => {
    return format(date, "w");
  }, [date]);

  return (
    <>
      <CalendarHeader>
        <CalendarHeaderContainer>
          <FlatButton onClick={onPreviousClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </FlatButton>
          <FlatButton onClick={onNextClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </FlatButton>
          <FlatButton onClick={onCalendarClick}>
            <FontAwesomeIcon icon={faCalendar} />
          </FlatButton>
          <CalendarHeaderTitle>{currentMonthName}</CalendarHeaderTitle>
          <CalendarSubheaderTitle>(Week {currentWeek})</CalendarSubheaderTitle>
        </CalendarHeaderContainer>
      </CalendarHeader>
      <Schedule dates={dates} />
    </>
  );
};

import React, { useMemo } from "react";
import { CalendarView } from "../components/Calendar/CalendarView";
import { addMonths, format, parse, startOfMonth } from "date-fns";
import { Link, useSearchParams } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { transparentize } from "polished";
import { Container } from "../components/Utils";

export const StyledLink = styled(Link)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #000000;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  transition: background-color 0.15s;

  &:hover {
    background: ${(props) => transparentize(0.7, props.theme.primary)};
  }
`;

export const CalendarHeader = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;

  @media screen and (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    margin-top: 12px;
    margin-bottom: 12px;
  }
`;

export const CalendarPage: React.FC = () => {
  const [params] = useSearchParams();
  const currentMonth = useMemo<Date>(() => {
    const queryDate = params.get("date");
    if (!_.isNil(queryDate)) {
      return parse(queryDate, "yyyy-MM", startOfMonth(new Date()));
    }

    return startOfMonth(new Date());
  }, [params]);

  const currentMonthName = useMemo(() => {
    return format(currentMonth, "LLLL yyyy");
  }, [currentMonth]);

  const previousUrl = useMemo(
    () => `/calendar?date=${format(addMonths(currentMonth, -1), "yyyy-MM")}`,
    [currentMonth]
  );

  const nextUrl = useMemo(
    () => `/calendar?date=${format(addMonths(currentMonth, 1), "yyyy-MM")}`,
    [currentMonth]
  );

  return (
    <>
      <CalendarHeader>
        <Container style={{ display: "flex" }}>
          <StyledLink to={previousUrl}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </StyledLink>
          <StyledLink to={nextUrl}>
            <FontAwesomeIcon icon={faChevronRight} />
          </StyledLink>
          <span style={{ fontSize: "1.4rem", fontWeight: 600 }}>
            {currentMonthName}
          </span>
        </Container>
      </CalendarHeader>
      <Container>
        <CalendarView month={currentMonth} />
      </Container>
    </>
  );
};

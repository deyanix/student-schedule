import React, { useCallback, useMemo } from "react";
import { CalendarView } from "../components/Calendar/CalendarView";
import { addMonths, format, parse, startOfMonth } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { transparentize } from "polished";
import { Container } from "../components/Utils";

export const CalendarHeaderButton = styled.button`
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
  cursor: pointer;
  border: none;
  background-color: #ffffff;

  &:hover {
    background: ${(props) => transparentize(0.7, props.theme.primary)};
  }
`;

export const CalendarHeaderContainer = styled(Container)`
  display: flex;
  align-items: center;
`;

export const CalendarSubheaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #4d4d4d;
  margin-left: 8px;
`;

export const CalendarHeaderTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
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
  const navigate = useNavigate();

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

  const onNextClick = useCallback(() => {
    navigate(
      `/calendar?date=${format(addMonths(currentMonth, 1), "yyyy-MM")}`,
      { replace: true }
    );
  }, [currentMonth]);

  const onPreviousClick = useCallback(() => {
    navigate(
      `/calendar?date=${format(addMonths(currentMonth, -1), "yyyy-MM")}`,
      { replace: true }
    );
  }, [currentMonth]);

  return (
    <>
      <CalendarHeader>
        <CalendarHeaderContainer>
          <CalendarHeaderButton onClick={onPreviousClick}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </CalendarHeaderButton>
          <CalendarHeaderButton onClick={onNextClick}>
            <FontAwesomeIcon icon={faChevronRight} />
          </CalendarHeaderButton>
          <CalendarHeaderTitle>{currentMonthName}</CalendarHeaderTitle>
        </CalendarHeaderContainer>
      </CalendarHeader>
      <Container>
        <CalendarView month={currentMonth} />
      </Container>
    </>
  );
};

import { ScheduleOccurrence } from "../../../api/Schedule/ScheduleService";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface ScheduleOccurrenceViewProps {
  occurrence: ScheduleOccurrence;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

const ScheduleCard = styled.div`
  background: ${(props) => props.color};
  border: 1px solid rgba(0, 0, 0, 0.23);
  margin: 3px 4px;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  position: relative;

  .schedule-card__name {
    font-weight: bold;
  }
  .schedule-card__title {
    font-size: 0.9em;
  }
  .schedule-card__type {
    position: absolute;
    top: 2px;
    right: 4px;
    font-size: 0.75em;
  }
`;

export const ScheduleOccurrenceView: React.FC<ScheduleOccurrenceViewProps> = (
  props
) => {
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [typeName, setTypeName] = useState<string>("");

  useEffect(() => {
    switch (props.occurrence.type) {
      case "INTEGRATED":
        setBgColor("#e1f6c2");
        setTypeName("INT");
        break;
      case "LECTURE":
        setBgColor("#f6e4c2");
        setTypeName("LEC");
        break;
      case "PROJECT":
        setBgColor("#b5dcf3");
        setTypeName("PROJ");
        break;
      case "LABORATORY":
        setBgColor("#e08383");
        setTypeName("LAB");
        break;
      case "TUTORIAL":
        setBgColor("#97c7b5");
        setTypeName("TUT");
        break;
    }
  }, [props.occurrence]);

  return (
    <ScheduleCard
      color={bgColor}
      style={{
        gridRowStart: props.rowStart,
        gridRowEnd: props.rowEnd,
        gridColumnStart: props.columnStart,
        gridColumnEnd: props.columnEnd,
      }}
    >
      <div className="schedule-card__type">{typeName}</div>
      <div className="schedule-card__name">{props.occurrence.name}</div>
      <div className="schedule-card__title">{props.occurrence.title}</div>
    </ScheduleCard>
  );
};

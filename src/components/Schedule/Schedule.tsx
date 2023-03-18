import React from "react";
import _ from "lodash";
import styled from "styled-components";

const ScheduleGridCell = styled.div`
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);

  &:nth-child(4n + 1) {
    border-top-width: 1px;
  }

  &:nth-child(8n + 1),
  &:nth-child(8n + 2),
  &:nth-child(8n + 3),
  &:nth-child(8n + 4) {
    background: #fcf9ec;
  }

  &:nth-child(8n + 5),
  &:nth-child(8n + 6),
  &:nth-child(8n + 7),
  &:nth-child(8n) {
    background: #f5f5f5;
  }

  &:first-child {
    border-top-width: 2px;
  }

  &:last-child {
    border-bottom-width: 2px;
  }
`;

const ScheduleGridColumn = styled.div`
  display: contents;

  &:first-child ${ScheduleGridCell} {
    border-left-width: 2px;
  }

  &:last-child ${ScheduleGridCell} {
    border-right-width: 2px;
  }
`;

const ScheduleGrid = styled.div`
  display: contents;
`;

const ScheduleVerticalHeader = styled.div`
  display: contents;
`;

const ScheduleVerticalHeaderCell = styled.div`
  border-width: 1px 0 1px 2px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: flex-end;
  align-items: start;
  padding: 2px 4px 0 0;
  font-size: 0.8rem;

  &:nth-child(2n + 1) {
    background: #fcf9ec;
  }

  &:nth-child(2n) {
    background: #f5f5f5;
  }

  &:first-child {
    border-top-width: 2px;
  }

  &:last-child {
    border-bottom-width: 2px;
  }
`;

const ScheduleHorizontalHeader = styled.div`
  display: contents;
`;

const ScheduleHorizontalHeaderCell = styled.div`
  border-width: 2px 1px 0 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffefc8;

  &:first-child {
    border-left-width: 2px;
  }

  &:last-child {
    border-right-width: 2px;
  }
`;

const ScheduleCard = styled.div`
  background: #f6e4c2;
  border: 1px solid rgba(169, 119, 0, 0.36);
  margin: 3px 4px;
  border-radius: 4px;
`;

export const Schedule: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "50px repeat(52, 15px)",
        gridTemplateColumns: "50px repeat(10, 1fr)",
      }}
    >
      <ScheduleGrid>
        {_.times(5).map((column) => (
          <ScheduleGridColumn>
            {_.times(52).map((row) => (
              <ScheduleGridCell
                style={{
                  gridRow: row + 2,
                  gridColumn: `${column * 2 + 2} / ${(column + 1) * 2 + 2}`,
                }}
              />
            ))}
          </ScheduleGridColumn>
        ))}
      </ScheduleGrid>

      <ScheduleVerticalHeader>
        {_.times(13).map((row) => (
          <ScheduleVerticalHeaderCell
            style={{
              gridRow: `${row * 4 + 2} / ${(row + 1) * 4 + 2}`,
              gridColumn: 1,
            }}
          >
            {(8 + row).toString().padStart(2, "0")}:00
          </ScheduleVerticalHeaderCell>
        ))}
      </ScheduleVerticalHeader>

      <ScheduleHorizontalHeader>
        {["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"].map(
          (day, column) => (
            <ScheduleHorizontalHeaderCell
              style={{
                gridRow: 1,
                gridColumn: `${column * 2 + 2} / ${(column + 1) * 2 + 2}`,
              }}
            >
              <div style={{ fontSize: "0.8rem" }}>{day}</div>
              <div style={{ fontWeight: 600 }}>
                {(column + 1).toString().padStart(2, "0")}.01.2023
              </div>
            </ScheduleHorizontalHeaderCell>
          )
        )}
      </ScheduleHorizontalHeader>

      <ScheduleCard
        style={{
          gridRow: "3 / 10",
          gridColumn: 2,
        }}
      />
      <ScheduleCard
        style={{
          gridRow: "11 / 14",
          gridColumn: 2,
        }}
      />
      <ScheduleCard
        style={{
          gridRow: "11 / 22",
          gridColumn: 3,
        }}
      />
    </div>
  );
};

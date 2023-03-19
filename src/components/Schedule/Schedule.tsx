import React, { useCallback, useEffect, useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import {
  ScheduleDayType,
  ScheduleModel,
  ScheduleOccurrence,
  ScheduleService,
} from "../../../api/Schedule/ScheduleService";
import { differenceInMinutes, format, isSameDay, setISODay } from "date-fns";
import { ScheduleOccurrenceView } from "./ScheduleOccurrenceView";
import {
  CalendarService,
  CalendarWeekDay,
} from "../../../api/Calendar/CalendarService";
import axios from "axios";

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

export interface ScheduleProps {
  dates: Date[];
}

export interface ScheduleRenderedColumn {
  date: Date;
  width: number;
  column: number;
  type: ScheduleDayType | null;
  rearrangedWeekDay: CalendarWeekDay | null;
  weekDay: string;
  occurrences: ScheduleRenderedOccurrence[];
}

export interface ScheduleRenderedOccurrence {
  occurrence: ScheduleOccurrence;
  rowStart: number;
  rowEnd: number;
  columnStart: number;
  columnEnd: number;
}

function isOverlapOccurrence(
  o1: ScheduleOccurrence,
  o2: ScheduleOccurrence
): boolean {
  return (
    (o1.start >= o2.start && o1.start < o2.end) ||
    (o1.end > o2.start && o1.end < o2.end)
  );
}

export const Schedule: React.FC<ScheduleProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<ScheduleModel[]>([]);
  const [renderedSchedules, setRenderedSchedules] = useState<
    ScheduleRenderedColumn[]
  >([]);

  const renderSchedule = useCallback(
    (schedule: ScheduleModel): ScheduleRenderedColumn => {
      let width =
        _.chain(schedule.occurrences)
          .flatMap(
            (o1) =>
              _.chain(schedule.occurrences)
                .filter((o2) => o2 !== o1 && isOverlapOccurrence(o1, o2))
                .value().length
          )
          .max()
          .value() + 1;
      if (_.isNaN(width)) {
        width = 1;
      }

      const occurrences = _.chain(schedule.occurrences)
        .map((o1) => ({
          occurrence: o1,
          columnStart: 0,
          columnEnd: width,
          rowStart:
            (differenceInMinutes(o1.start, schedule.date) - 8 * 60) / 15,
          rowEnd: (differenceInMinutes(o1.end, schedule.date) - 8 * 60) / 15,
        }))
        .value();

      const collisions = _.chain(occurrences)
        .map((o1) =>
          _.chain(occurrences)
            .filter(
              (o2) =>
                o2 !== o1 && isOverlapOccurrence(o1.occurrence, o2.occurrence)
            )
            .push(o1)
            .orderBy([(o2) => o2.occurrence.start, (o2) => o2.occurrence.end])
            .value()
        )
        .filter((o) => o.length > 1)
        .uniqWith(_.isEqual)
        .value();

      collisions.forEach((group) => {
        group.forEach((block, i) => {
          block.columnStart += i;
          block.columnEnd -= group.length - 1;
        });
      });

      let weekdayDate = schedule.date;
      if (!_.isNil(schedule.rearrangedWeekDay)) {
        weekdayDate = setISODay(
          weekdayDate,
          CalendarService.getISOWeekDay(schedule.rearrangedWeekDay)
        );
      }

      return {
        date: schedule.date,
        column: 0,
        width,
        type: schedule.type,
        rearrangedWeekDay: schedule.rearrangedWeekDay,
        weekDay: format(weekdayDate, "EEEE"),
        occurrences,
      };
    },
    []
  );

  const renderSchedules = useCallback(
    (schedules: ScheduleModel[]): ScheduleRenderedColumn[] => {
      const rendered = props.dates
        .map((d) => {
          const found = schedules.find((s) => isSameDay(s.date, d));
          if (_.isNil(found)) {
            return {
              date: d,
              type: null,
              rearrangedWeekDay: null,
              occurrences: [],
            };
          }
          return found;
        })
        .map((s) => renderSchedule(s as ScheduleModel));

      return rendered.map((s1, index1) => {
        const before = rendered.slice(0, index1);
        let offset = _.sumBy(before, (s2) => s2.width);
        if (_.isNaN(offset)) {
          offset = 0;
        }

        s1.column += offset;
        s1.occurrences.forEach((o) => {
          o.columnStart += offset;
          o.columnEnd += offset;
        });

        return s1;
      });
    },
    [props.dates, renderSchedule]
  );

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    ScheduleService.getWeek(props.dates[0], { signal: controller.signal })
      .then((schedules) => {
        setSchedules(schedules);
        setLoading(false);
      })
      .catch((err) => {
        if (!axios.isAxiosError(err) || err.name !== "CanceledError") {
          setLoading(false);
          throw err;
        }
      });

    return () => {
      controller.abort();
    };
  }, [props.dates]);

  useEffect(() => {
    setRenderedSchedules(renderSchedules(schedules));
  }, [schedules, renderSchedules]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "50px repeat(52, 15px)",
        gridTemplateColumns: `50px ${renderedSchedules
          .map((col) => `repeat(${col.width}, ${1 / col.width}fr)`)
          .join(" ")}`,
        opacity: loading ? 0.5 : 1,
        minWidth: 960,
      }}
    >
      <ScheduleGrid>
        {renderedSchedules.map((column) => (
          <ScheduleGridColumn>
            {_.times(52).map((row) => (
              <ScheduleGridCell
                style={{
                  gridRow: row + 2,
                  gridColumn: `${column.column + 2} / ${
                    column.column + column.width + 2
                  }`,
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
        {renderedSchedules.map((column) => (
          <ScheduleHorizontalHeaderCell
            style={{
              gridRow: 1,
              gridColumn: `${column.column + 2} / ${
                column.column + column.width + 2
              }`,
              background: loading
                ? undefined
                : _.isNil(column.type) && !loading
                ? "#8dbcf8"
                : !_.isNil(column.rearrangedWeekDay)
                ? "#cfdc90"
                : undefined,
            }}
          >
            <div style={{ fontSize: "0.8rem" }}>{column.weekDay}</div>
            <div style={{ fontWeight: 600 }}>
              {format(column.date, "dd.MM.yyyy")}
            </div>
          </ScheduleHorizontalHeaderCell>
        ))}
      </ScheduleHorizontalHeader>
      {renderedSchedules.map((renderedColumn) =>
        renderedColumn.occurrences.map((occurrence) => (
          <ScheduleOccurrenceView
            occurrence={occurrence.occurrence}
            columnStart={occurrence.columnStart + 2}
            columnEnd={occurrence.columnEnd + 2}
            rowStart={occurrence.rowStart + 2}
            rowEnd={occurrence.rowEnd + 2}
          />
        ))
      )}
    </div>
  );
};

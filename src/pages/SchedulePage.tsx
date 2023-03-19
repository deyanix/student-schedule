import { Schedule } from "../components/Schedule/Schedule";
import React, { useCallback, useMemo, useState } from "react";
import { addDays, format, startOfISOWeek } from "date-fns";
import _ from "lodash";

export const SchedulePage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const dates = useMemo(() => {
    const start = startOfISOWeek(date);
    return _.times(5).map((i) => addDays(start, i));
  }, [date]);

  const onNextClick = useCallback(() => {
    setDate(addDays(date, 7));
  }, [date]);
  const onPreviousClick = useCallback(() => {
    setDate(addDays(date, -7));
  }, [date]);

  const title = useMemo(() => {
    const firstDate = _.first(dates);
    const lastDate = _.last(dates);
    if (_.isNil(firstDate) || _.isNil(lastDate)) {
      return undefined;
    }
    return [firstDate, lastDate].map((d) => format(d, "dd.MM")).join("-");
  }, [dates]);

  return (
    <div>
      <div>
        <button onClick={onPreviousClick}>&lt;</button>
        {title}
        <button onClick={onNextClick}>&gt;</button>
      </div>
      <Schedule dates={dates} />
    </div>
  );
};

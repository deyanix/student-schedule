import { Schedule } from "../components/Schedule/Schedule";
import React, { useCallback, useState } from "react";
import { addDays } from "date-fns";

export const SchedulePage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  const onNextClick = useCallback(() => {
    setDate(addDays(date, 7));
  }, [date]);
  const onPreviousClick = useCallback(() => {
    setDate(addDays(date, -7));
  }, [date]);

  return (
    <div>
      <div>
        <button onClick={onPreviousClick}>&lt;</button>
        <button onClick={onNextClick}>&gt;</button>
      </div>
      <Schedule date={date} />
    </div>
  );
};

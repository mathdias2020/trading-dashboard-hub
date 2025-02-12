
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays, startOfDay } from 'date-fns';

export const useDateRange = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: startOfDay(subDays(new Date(), 30)), // Last 30 days as default, starting at beginning of day
    to: startOfDay(new Date()) // Today at beginning of day
  });

  return {
    date,
    setDate,
  };
};


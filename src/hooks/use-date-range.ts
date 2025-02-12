
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { subDays } from 'date-fns';

export const useDateRange = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30), // Last 30 days as default
    to: new Date()
  });

  return {
    date,
    setDate,
  };
};

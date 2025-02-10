
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "react-day-picker";

export const useTradingResults = (date: DateRange | undefined) => {
  const { data: tradingResults } = useQuery({
    queryKey: ['tradingResults', date],
    queryFn: async () => {
      const { data: results, error } = await supabase
        .from('trading_results')
        .select('*')
        .eq('producer_id', (await supabase.auth.getUser()).data.user?.id)
        .gte('date', date?.from?.toISOString() || new Date().toISOString())
        .lte('date', date?.to?.toISOString() || new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      return results;
    },
    enabled: !!date?.from && !!date?.to
  });

  return {
    capitalCurveData: tradingResults?.map(result => ({
      date: result.date,
      value: result.result
    })) || []
  };
};

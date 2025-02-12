
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Trade {
  id: string;
  date: string;
  result: number;
  client_id: string;
  producer_id: string;
  instrument: string;
  type: string;
  status: string;
}

const fetchTrades = async (clientId: string, dateFrom: string, dateTo: string) => {
  console.log('Fetching trades with params:', { clientId, dateFrom, dateTo });

  try {
    const { data: trades, error } = await supabase
      .from("trades")
      .select("*")
      .eq("client_id", clientId)
      .gte("date", dateFrom)
      .lte("date", dateTo)
      .order("date", { ascending: true });

    if (error) {
      console.error('Supabase Error:', error);
      throw error;
    }

    console.log('Received trade data:', trades);
    return { trades, message: "Success" };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const useTrades = (clientId: string, dateFrom: string, dateTo: string) => {
  return useQuery({
    queryKey: ["trades", clientId, dateFrom, dateTo],
    queryFn: () => fetchTrades(clientId, dateFrom, dateTo),
    enabled: !!clientId && !!dateFrom && !!dateTo,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};


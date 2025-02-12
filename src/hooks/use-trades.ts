
import { useQuery } from "@tanstack/react-query";

interface Trade {
  id: string;
  date: string;
  result: number;
  accountId: number;
}

interface TradesResponse {
  trades: Trade[];
  message: string;
}

const fetchTrades = async (id: number, dateFrom: string, dateTo: string) => {
  const params = new URLSearchParams({
    id: id.toString(),
    dateFrom,
    dateTo,
  });

  console.log('Fetching trades with params:', {
    id,
    dateFrom,
    dateTo,
    url: `https://dashboard-api-two.vercel.app/trades?${params}`
  });

  try {
    const response = await fetch(
      `https://dashboard-api-two.vercel.app/trades?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Add CORS mode explicitly
      }
    );

    if (!response.ok) {
      console.error('HTTP Error Response:', {
        status: response.status,
        statusText: response.statusText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Received trade data:', data);
    return data as TradesResponse;
  } catch (error) {
    console.error('Fetch error:', error);
    // Return empty data instead of throwing
    return { trades: [], message: "Failed to fetch data" };
  }
};

export const useTrades = (id: number, dateFrom: string, dateTo: string) => {
  return useQuery({
    queryKey: ["trades", id, dateFrom, dateTo],
    queryFn: () => fetchTrades(id, dateFrom, dateTo),
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
};

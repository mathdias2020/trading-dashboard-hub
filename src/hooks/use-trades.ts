
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

  const response = await fetch(
    `https://dashboard-api-two.vercel.app/trades?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trades");
  }

  const data = await response.json();
  return data as TradesResponse;
};

export const useTrades = (id: number, dateFrom: string, dateTo: string) => {
  return useQuery({
    queryKey: ["trades", id, dateFrom, dateTo],
    queryFn: () => fetchTrades(id, dateFrom, dateTo),
  });
};

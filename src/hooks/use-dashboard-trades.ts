
import { useMemo, useEffect } from 'react';
import { format, isToday, isThisMonth, subDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { useTrades } from '@/hooks/use-trades';
import { useToast } from '@/hooks/use-toast';

interface TradeBalance {
  dailyBalance: number;
  periodBalance: number;
}

interface ChartDataPoint {
  date: string;
  value: number;
}

export const useDashboardTrades = (date: DateRange | undefined) => {
  const { toast } = useToast();
  const defaultStartDate = subDays(new Date(), 30); // Last 30 days as default
  const defaultEndDate = new Date();

  const { data: tradesData, isLoading } = useTrades(
    1,
    date?.from ? format(date.from, "yyyy-MM-dd") : format(defaultStartDate, "yyyy-MM-dd"),
    date?.to ? format(date.to, "yyyy-MM-dd") : format(defaultEndDate, "yyyy-MM-dd")
  );

  useEffect(() => {
    if (!isLoading && tradesData?.trades && tradesData.trades.length === 0) {
      toast({
        title: "Sem dados para o período",
        description: "Tente selecionar um período diferente"
      });
    }
  }, [tradesData?.trades, isLoading, toast]);

  const balances = useMemo((): TradeBalance => {
    if (!tradesData?.trades) return { dailyBalance: 0, periodBalance: 0 };

    const dailyTrades = tradesData.trades.filter(trade => 
      isToday(new Date(trade.date.replace(".", "-")))
    );

    const periodTrades = tradesData.trades;

    const dailyBalance = dailyTrades.reduce((sum, trade) => sum + trade.result, 0);
    const periodBalance = periodTrades.reduce((sum, trade) => sum + trade.result, 0);

    return { dailyBalance, periodBalance };
  }, [tradesData?.trades]);

  const balanceTitle = useMemo(() => {
    if (!date?.from || !date?.to) return "Saldo Mensal";
    const isCurrentMonth = isThisMonth(date.from) && isThisMonth(date.to);
    return isCurrentMonth ? "Saldo Mensal" : "Saldo do Período";
  }, [date]);

  const chartData = useMemo((): ChartDataPoint[] => {
    if (!tradesData?.trades) return [];

    const tradesByDate = tradesData.trades.reduce((acc: { [key: string]: number }, trade) => {
      const date = trade.date.split(" ")[0];
      acc[date] = (acc[date] || 0) + trade.result;
      return acc;
    }, {});

    return Object.entries(tradesByDate).map(([date, value]) => ({
      date,
      value
    }));
  }, [tradesData?.trades]);

  return {
    trades: tradesData?.trades || [],
    isLoading,
    balances,
    balanceTitle,
    chartData
  };
};

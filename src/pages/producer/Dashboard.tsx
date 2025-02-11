
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import DashboardHeader from "@/components/producer/DashboardHeader";
import DashboardStats from "@/components/producer/DashboardStats";
import CapitalCurveSection from "@/components/producer/dashboard/CapitalCurveSection";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");
  const [currentView, setCurrentView] = useState<"dashboard" | "settings" | "clients">("dashboard");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });

  const producerData = {
    name: "João Silva",
    status: "Ativo",
    mt5Account: "12345678",
    personalBalance: 45000,
    subscribersBalance: 75000,
    monthlyRevenue: 7500,
    dailyPersonalBalance: 2500,
    dailySubscribersBalance: 3800,
    monthlyPersonalBalance: 15000,
    monthlySubscribersBalance: 25000,
    activeSubscribers: 15,
  };

  const tradeHistory = [
    { id: 1, date: "2024-02-07", instrument: "WINM24", type: "Compra", result: 1500 },
    { id: 2, date: "2024-02-07", instrument: "WINM24", type: "Venda", result: -500 },
    { id: 3, date: "2024-02-06", instrument: "WINM24", type: "Compra", result: 2000 },
  ];

  const personalCapitalCurveData = [
    { date: "2024-02-04", value: -70 },
    { date: "2024-02-05", value: 150 },
    { date: "2024-02-06", value: 200 },
    { date: "2024-02-06", value: 180 },
    { date: "2024-02-06", value: 350 },
    { date: "2024-02-06", value: 400 },
    { date: "2024-02-07", value: 500 },
  ];

  const subscribersCapitalCurveData = [
    { date: "2024-02-04", value: 100 },
    { date: "2024-02-05", value: 250 },
    { date: "2024-02-06", value: 300 },
    { date: "2024-02-06", value: 280 },
    { date: "2024-02-06", value: 450 },
    { date: "2024-02-06", value: 500 },
    { date: "2024-02-07", value: 600 },
  ];

  return (
    <div className="space-y-6">
      <DashboardHeader 
        producerName={producerData.name}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold">Saldo Diário</h3>
          <p className="text-2xl mt-2">
            R$ {balanceView === "personal" 
              ? producerData.dailyPersonalBalance.toLocaleString()
              : producerData.dailySubscribersBalance.toLocaleString()
            }
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Saldo Mensal</h3>
          <p className="text-2xl mt-2">
            R$ {balanceView === "personal" 
              ? producerData.monthlyPersonalBalance.toLocaleString()
              : producerData.monthlySubscribersBalance.toLocaleString()
            }
          </p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Assinantes Ativos</h3>
          <p className="text-2xl mt-2">{producerData.activeSubscribers}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Status</h3>
          <p className="mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              {producerData.status}
            </span>
          </p>
        </Card>
      </div>

      <DashboardStats 
        personalBalance={producerData.personalBalance}
        subscribersBalance={producerData.subscribersBalance}
        balanceView={balanceView}
        onBalanceViewChange={setBalanceView}
        activeClientsCount={producerData.activeSubscribers}
        monthlyRevenue={producerData.monthlyRevenue}
        status={producerData.status}
      />

      <CapitalCurveSection 
        balanceView={balanceView}
        personalCapitalCurveData={personalCapitalCurveData}
        subscribersCapitalCurveData={subscribersCapitalCurveData}
      />

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Histórico de Trades</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Instrumento</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Resultado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tradeHistory.map((trade) => (
              <TableRow key={trade.id}>
                <TableCell>{new Date(trade.date).toLocaleDateString('pt-BR')}</TableCell>
                <TableCell>{trade.instrument}</TableCell>
                <TableCell>{trade.type}</TableCell>
                <TableCell className={trade.result >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {trade.result.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProducerDashboard;

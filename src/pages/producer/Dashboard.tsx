
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import StatsCards from "@/components/producer/dashboard/StatsCards";
import ClientsTable from "@/components/producer/dashboard/ClientsTable";
import ClientSettings from "@/components/producer/dashboard/ClientSettings";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");
  const [currentView, setCurrentView] = useState<"dashboard" | "settings">("dashboard");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const { toast } = useToast();

  const producerData = {
    name: "João Silva",
    status: "Ativo",
    mt5Account: "12345678",
    personalBalance: 45000,
    subscribersBalance: 75000,
    monthlyRevenue: 7500,
  };

  const clients = [
    { 
      id: 1, 
      name: "Ana Costa",
      account: "MT5-001",
      monthlyResult: 2500,
      status: "Ativo",
      maxContracts: 1,
      algoTrading: true,
      mt5Balance: 15000,
    },
    { 
      id: 2, 
      name: "Carlos Mendes",
      account: "MT5-002",
      monthlyResult: 1800,
      status: "Ativo",
      maxContracts: 2,
      algoTrading: false,
      mt5Balance: 8000,
    },
    { 
      id: 3, 
      name: "Beatriz Lima",
      account: "MT5-003",
      monthlyResult: -500,
      status: "Inativo",
      maxContracts: 1,
      algoTrading: true,
      mt5Balance: 5000,
    },
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

  const handleStatusChange = (clientId: number) => {
    toast({
      title: "Status atualizado",
      description: "O status do cliente foi atualizado com sucesso.",
    });
  };

  const handleMaxContractsChange = (clientId: number, value: string) => {
    toast({
      title: "Limite atualizado",
      description: "O limite de contratos foi atualizado com sucesso.",
    });
  };

  const activeClientsCount = clients.filter(c => c.status === "Ativo").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
        <div className="flex items-center space-x-4">
          <Button 
            variant={currentView === "dashboard" ? "default" : "ghost"}
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant={currentView === "settings" ? "default" : "ghost"}
            onClick={() => setCurrentView("settings")}
          >
            Configurações
          </Button>
          <div className="text-sm text-muted-foreground">Bem-vindo, {producerData.name}</div>
        </div>
      </div>

      {currentView === "dashboard" ? (
        <>
          <StatsCards
            balanceView={balanceView}
            setBalanceView={setBalanceView}
            producerData={producerData}
            activeClientsCount={activeClientsCount}
          />
          <div className="mt-8 mb-6">
            <CapitalCurveChart 
              data={balanceView === "personal" ? personalCapitalCurveData : subscribersCapitalCurveData} 
            />
          </div>
          <ClientsTable
            clients={clients}
            date={date}
            setDate={setDate}
          />
        </>
      ) : (
        <ClientSettings
          clients={clients}
          onStatusChange={handleStatusChange}
          onMaxContractsChange={handleMaxContractsChange}
        />
      )}
    </div>
  );
};

export default ProducerDashboard;

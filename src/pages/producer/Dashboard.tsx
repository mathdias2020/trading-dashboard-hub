
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { DateRange } from "react-day-picker";
import StatsCards from "@/components/producer/dashboard/StatsCards";
import ClientsTable from "@/components/producer/dashboard/ClientsTable";
import ClientSettings from "@/components/producer/dashboard/ClientSettings";
import { useProducerData } from "@/hooks/producer/useProducerData";
import { useProducerClients } from "@/hooks/producer/useProducerClients";
import { useTradingResults } from "@/hooks/producer/useTradingResults";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");
  const [currentView, setCurrentView] = useState<"dashboard" | "settings">("dashboard");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });

  const { producerData } = useProducerData();
  const { clients, handleStatusChange, handleMaxContractsChange, subscribersBalance, activeClientsCount } = useProducerClients();
  const { capitalCurveData } = useTradingResults(date);

  const statsData = {
    ...producerData,
    subscribersBalance
  };

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
            producerData={statsData}
            activeClientsCount={activeClientsCount}
          />
          <div className="mt-8 mb-6">
            <CapitalCurveChart 
              data={capitalCurveData}
            />
          </div>
          <ClientsTable
            clients={clients || []}
            date={date}
            setDate={setDate}
          />
        </>
      ) : (
        <ClientSettings
          clients={clients || []}
          onStatusChange={handleStatusChange}
          onMaxContractsChange={handleMaxContractsChange}
        />
      )}
    </div>
  );
};

export default ProducerDashboard;

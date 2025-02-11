
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import DashboardStats from "@/components/client/overview/DashboardStats";
import OperationsTable from "@/components/client/overview/OperationsTable";
import AccountSettings from "@/components/client/settings/AccountSettings";
import DashboardHeader from "@/components/client/overview/DashboardHeader";

const ClientDashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [formData, setFormData] = useState({
    account: "123",
    password: "1234",
  });

  const clientData = {
    name: "Ana Costa",
    status: "Aguardando Aprovação",
    producer: "João Silva",
    lastOperation: "2024-02-09",
    dailyBalance: 500,
    monthlyBalance: 1200,
    producerContractLimit: 10,
    algoTrading: true,
    mt5Balance: 15000,
    isApprovedByAdmin: false,
  };

  const operations = [
    { id: 1, date: "2024-02-09", type: "Compra", symbol: "PETR4", result: 500 },
    { id: 2, date: "2024-02-08", type: "Venda", symbol: "VALE3", result: -200 },
    { id: 3, date: "2024-02-07", type: "Compra", symbol: "ITUB4", result: 900 },
  ];

  const capitalCurveData = [
    { date: "2024-02-04", value: -50 },
    { date: "2024-02-05", value: 100 },
    { date: "2024-02-06", value: 150 },
    { date: "2024-02-06", value: 120 },
    { date: "2024-02-06", value: 280 },
    { date: "2024-02-06", value: 320 },
    { date: "2024-02-07", value: 400 },
  ];

  const getFilteredCapitalData = () => {
    if (!date?.from || !date?.to) return capitalCurveData;
    
    return capitalCurveData.filter((item) => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: date.from, 
        end: date.to 
      });
    });
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        date={date}
        onDateChange={setDate}
        clientName={clientData.name}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats 
            dailyBalance={clientData.dailyBalance}
            monthlyBalance={clientData.monthlyBalance}
            status={clientData.status}
          />

          <div className="mt-8 mb-6">
            <CapitalCurveChart data={getFilteredCapitalData()} />
          </div>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Últimas Operações</h2>
            <OperationsTable operations={operations} />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Configurações da Conta</h2>
            <AccountSettings 
              isApprovedByAdmin={clientData.isApprovedByAdmin}
              formData={formData}
              setFormData={setFormData}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;


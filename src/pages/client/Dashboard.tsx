
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();

  const clientData = {
    name: "Ana Costa",
    status: "Aguardando Pagamento",
    producer: "João Silva",
    lastOperation: "2024-02-09",
    dailyBalance: 500,
    monthlyBalance: 1200,
    producerContractLimit: 10,
    algoTrading: true,
    mt5Balance: 15000,
    isApprovedByAdmin: false,
    paymentPending: true, // Mock data for payment status
  };

  const operations = [
    { id: 1, date: "2024-02-09", type: "Compra", symbol: "PETR4", result: 500 },
    { id: 2, date: "2024-02-08", type: "Venda", symbol: "VALE3", result: -200 },
    { id: 3, date: "2024-02-07", type: "Compra", symbol: "ITUB4", result: 900 },
  ];

  const handlePayment = () => {
    toast({
      title: "Processando pagamento",
      description: "Você será redirecionado para a página de pagamento",
    });
  };

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

      {clientData.paymentPending && (
        <div className="flex justify-center">
          <Button onClick={handlePayment} className="w-fit">
            Pagar mensalidade
          </Button>
        </div>
      )}

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

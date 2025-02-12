
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, isToday, isThisMonth } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardStats from "@/components/client/overview/DashboardStats";
import OperationsTable from "@/components/client/overview/OperationsTable";
import AccountSettings from "@/components/client/settings/AccountSettings";
import DashboardHeader from "@/components/client/overview/DashboardHeader";
import ClientStatusActions from "@/components/client/overview/ClientStatusActions";
import { useDateRange } from "@/hooks/use-date-range";
import { useClientData } from "@/contexts/ClientDataContext";
import { useTrades } from "@/hooks/use-trades";

const ClientDashboard = () => {
  const { date, setDate } = useDateRange();
  const [activeTab, setActiveTab] = useState("overview");
  const [formData, setFormData] = useState({
    account: "",
    password: "",
  });
  const { toast } = useToast();
  const clientData = useClientData();

  const { data: tradesData, isLoading: isLoadingTrades } = useTrades(
    1,
    date?.from ? format(date.from, "yyyy-MM-dd") : "2024-01-01",
    date?.to ? format(date.to, "yyyy-MM-dd") : "2025-02-12"
  );

  const calculateBalances = () => {
    if (!tradesData?.trades) return { dailyBalance: 0, periodBalance: 0 };

    const dailyTrades = tradesData.trades.filter(trade => 
      isToday(new Date(trade.date.replace(".", "-")))
    );

    const periodTrades = tradesData.trades;

    const dailyBalance = dailyTrades.reduce((sum, trade) => sum + trade.result, 0);
    const periodBalance = periodTrades.reduce((sum, trade) => sum + trade.result, 0);

    return { dailyBalance, periodBalance };
  };

  const getBalanceTitle = () => {
    if (!date?.from || !date?.to) return "Saldo Mensal";
    const isCurrentMonth = isThisMonth(date.from) && isThisMonth(date.to);
    return isCurrentMonth ? "Saldo Mensal" : "Saldo do Período";
  };

  const { dailyBalance, periodBalance } = calculateBalances();

  const handlePayment = () => {
    toast({
      title: "Processando pagamento",
      description: "Você será redirecionado para a página de pagamento",
    });
    setTimeout(() => {
      toast({
        title: "Pagamento recebido",
        description: "Por favor, configure sua conta para continuar",
      });
      setActiveTab("settings");
    }, 2000);
  };

  const handleAccountSubmit = (account: string, password: string) => {
    setFormData({ account, password });
    toast({
      title: "Informações enviadas",
      description: "Suas informações foram enviadas para revisão. Em breve um administrador irá analisá-las.",
    });
    clientData.status = "Em revisão";
  };

  const formatTradesForChart = () => {
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
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        date={date}
        onDateChange={setDate}
        clientName={clientData.name}
      />

      <ClientStatusActions
        status={clientData.status}
        accountConfigured={clientData.accountConfigured}
        paymentReceived={clientData.paymentReceived}
        paymentPending={clientData.paymentPending}
        onPayment={handlePayment}
        onConfigureAccount={() => setActiveTab("settings")}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats 
            dailyBalance={dailyBalance}
            balance={periodBalance}
            balanceTitle={getBalanceTitle()}
            status={clientData.status}
          />

          <div className="mt-8 mb-6">
            <CapitalCurveChart data={formatTradesForChart()} />
          </div>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Últimas Operações</h2>
            <OperationsTable 
              trades={tradesData?.trades || []} 
              isLoading={isLoadingTrades} 
            />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Configurações da Conta</h2>
            <AccountSettings 
              isApprovedByAdmin={clientData.isApprovedByAdmin}
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleAccountSubmit}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;

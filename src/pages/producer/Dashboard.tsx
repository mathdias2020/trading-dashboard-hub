
import { useState } from "react";
import { addDays } from "date-fns";
import { DateRange } from "react-day-picker";
import DashboardHeader from "@/components/producer/DashboardHeader";
import DashboardStats from "@/components/producer/DashboardStats";
import CapitalCurveSection from "@/components/producer/dashboard/CapitalCurveSection";
import ClientsSection from "@/components/producer/dashboard/ClientsSection";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");
  const [currentView, setCurrentView] = useState<"dashboard" | "settings">("dashboard");
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

  const activeClientsCount = clients.filter(c => c.status === "Ativo").length;

  const renderDashboardView = () => (
    <>
      <DashboardStats 
        personalBalance={producerData.personalBalance}
        subscribersBalance={producerData.subscribersBalance}
        balanceView={balanceView}
        onBalanceViewChange={setBalanceView}
        activeClientsCount={activeClientsCount}
        monthlyRevenue={producerData.monthlyRevenue}
        status={producerData.status}
      />

      <CapitalCurveSection 
        balanceView={balanceView}
        personalCapitalCurveData={personalCapitalCurveData}
        subscribersCapitalCurveData={subscribersCapitalCurveData}
      />

      <ClientsSection 
        clients={clients}
        dateRange={date}
        onDateRangeChange={setDate}
      />
    </>
  );

  return (
    <div className="space-y-6">
      <DashboardHeader 
        producerName={producerData.name}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === "dashboard" ? renderDashboardView() : null}
    </div>
  );
};

export default ProducerDashboard;

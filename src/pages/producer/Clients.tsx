
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import ClientsSection from "@/components/producer/dashboard/ClientsSection";
import DashboardHeader from "@/components/producer/DashboardHeader";

const ProducerClients = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });

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

  return (
    <div className="space-y-6">
      <DashboardHeader 
        producerName="João Silva"
        currentView="clients"
        onViewChange={() => {}}
      />
      <ClientsSection 
        clients={clients}
        dateRange={date}
        onDateRangeChange={setDate}
      />
    </div>
  );
};

export default ProducerClients;

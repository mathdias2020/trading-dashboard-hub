
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import ClientsTable from "@/components/producer/ClientsTable";

const ClientsPage = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });

  const clients = [
    {
      id: 1,
      name: "João Silva",
      account: "123456",
      monthlyResult: 1500,
      status: "Ativo",
      algoTrading: true,
      mt5Balance: 10000
    },
    {
      id: 2,
      name: "Maria Santos",
      account: "789012",
      monthlyResult: -500,
      status: "Inativo",
      algoTrading: false,
      mt5Balance: 5000
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Gerenciamento de Clientes</h1>
      <ClientsTable 
        clients={clients}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
    </div>
  );
};

export default ClientsPage;

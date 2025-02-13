
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsHeader } from "@/components/producer/SettingsHeader";
import { ClientManagementTable } from "@/components/producer/ClientManagementTable";
import { useClientManagement } from "@/hooks/use-client-management";
import { Client } from "@/types/client";

const initialClients: Client[] = [
  { 
    id: "1", 
    name: "Ana Costa",
    account_number: "001",
    monthly_result: 2500,
    status: "Ativo",
    producer_id: "1",
    subscription_date: "2024-01-15",
    contracts: 2,
    max_contracts: 5,
    algo_trading: true,
    mt5_balance: 15000,
    email: "ana@example.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "2", 
    name: "Carlos Mendes",
    account_number: "002",
    monthly_result: -500,
    status: "Ativo",
    producer_id: "1",
    subscription_date: "2024-02-01",
    contracts: 1,
    max_contracts: 3,
    algo_trading: false,
    mt5_balance: 8000,
    email: "carlos@example.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  { 
    id: "3", 
    name: "Beatriz Lima",
    account_number: "003",
    monthly_result: 1200,
    status: "Inativo",
    producer_id: "1",
    subscription_date: "2024-01-10",
    contracts: 0,
    max_contracts: 2,
    algo_trading: true,
    mt5_balance: 5000,
    email: "beatriz@example.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
];

const ProducerSettings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { 
    clients, 
    toggleClientStatus, 
    updateClientContracts, 
    toggleAlgoTrading 
  } = useClientManagement("1"); // Using a fixed producer ID for now

  return (
    <div className="space-y-6">
      <SettingsHeader date={date} onDateChange={setDate} />
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Clientes</h2>
        <ClientManagementTable 
          clients={clients || initialClients}
          onToggleStatus={toggleClientStatus}
          onUpdateContracts={updateClientContracts}
          onToggleAlgoTrading={toggleAlgoTrading}
        />
      </Card>
    </div>
  );
};

export default ProducerSettings;

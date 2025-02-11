
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsHeader } from "@/components/producer/SettingsHeader";
import { ClientManagementTable } from "@/components/producer/ClientManagementTable";
import { useClientManagement } from "@/hooks/use-client-management";

const initialClients = [
  { 
    id: 1, 
    name: "Ana Costa",
    accountNumber: "001",
    monthlyResult: 2500,
    status: "Ativo",
    producerId: 1,
    subscriptionDate: "2024-01-15",
    contracts: 2,
    maxContracts: 5,
    algoTrading: true,
    mt5Balance: 15000,
    result: 2500
  },
  { 
    id: 2, 
    name: "Carlos Mendes",
    accountNumber: "002",
    monthlyResult: -500,
    status: "Ativo",
    producerId: 1,
    subscriptionDate: "2024-02-01",
    contracts: 1,
    maxContracts: 3,
    algoTrading: false,
    mt5Balance: 8000,
    result: -500
  },
  { 
    id: 3, 
    name: "Beatriz Lima",
    accountNumber: "003",
    monthlyResult: 1200,
    status: "Inativo",
    producerId: 1,
    subscriptionDate: "2024-01-10",
    contracts: 0,
    maxContracts: 2,
    algoTrading: true,
    mt5Balance: 5000,
    result: 1200
  },
];

const ProducerSettings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { 
    clients, 
    toggleClientStatus, 
    updateClientContracts, 
    toggleAlgoTrading 
  } = useClientManagement(initialClients);

  return (
    <div className="space-y-6">
      <SettingsHeader date={date} onDateChange={setDate} />
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Clientes</h2>
        <ClientManagementTable 
          clients={clients}
          onToggleStatus={toggleClientStatus}
          onUpdateContracts={updateClientContracts}
          onToggleAlgoTrading={toggleAlgoTrading}
        />
      </Card>
    </div>
  );
};

export default ProducerSettings;


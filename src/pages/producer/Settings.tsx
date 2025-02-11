
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SettingsHeader } from "@/components/producer/SettingsHeader";
import { ClientManagementTable } from "@/components/producer/ClientManagementTable";

const ProducerSettings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: "Ana Costa", 
      status: "Ativo", 
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
      status: "Ativo", 
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
      status: "Inativo", 
      subscriptionDate: "2024-01-10",
      contracts: 0,
      maxContracts: 2,
      algoTrading: true,
      mt5Balance: 5000,
      result: 1200
    },
  ]);

  return (
    <div className="space-y-6">
      <SettingsHeader date={date} onDateChange={setDate} />
      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Clientes</h2>
        <ClientManagementTable clients={clients} onUpdateClient={setClients} />
      </Card>
    </div>
  );
};

export default ProducerSettings;


import { Client } from "@/types/client";
import { Producer } from "@/types/producer";
import { Card } from "@/components/ui/card";
import AddClientDialog from "../AddClientDialog";
import { ClientManagementTable } from "@/components/producer/ClientManagementTable";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useClientManagement } from "@/hooks/use-client-management";

interface ClientsManagementProps {
  selectedProducer: Producer;
  clients: Client[];
  onAddClient?: (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producer_id: string;
  }) => void;
}

const ClientsManagement = ({ selectedProducer, clients: initialClients, onAddClient }: ClientsManagementProps) => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const { toast } = useToast();
  const { clients, toggleClientStatus, updateClientContracts, toggleAlgoTrading } = useClientManagement(selectedProducer.id);

  const handleAddClient = (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producer_id: string;
  }) => {
    if (onAddClient) {
      onAddClient(clientData);
      toast({
        title: "Cliente adicionado",
        description: `${clientData.name} foi adicionado como cliente`,
      });
    }
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Clientes de {selectedProducer.name}</h2>
        <AddClientDialog
          isOpen={isAddClientOpen}
          onOpenChange={setIsAddClientOpen}
          onAddClient={handleAddClient}
          producer_id={selectedProducer.id}
        />
      </div>
      <div className="space-y-4">
        <ClientManagementTable 
          clients={clients || initialClients}
          onToggleStatus={toggleClientStatus}
          onUpdateContracts={updateClientContracts}
          onToggleAlgoTrading={toggleAlgoTrading}
        />
      </div>
    </Card>
  );
};

export default ClientsManagement;


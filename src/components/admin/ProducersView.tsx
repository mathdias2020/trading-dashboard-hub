
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import { useState } from "react";
import AddClientDialog from "./AddClientDialog";
import { useToast } from "@/hooks/use-toast";
import { ClientManagementTable } from "@/components/producer/ClientManagementTable";
import { useClientManagement } from "@/hooks/use-client-management";

interface ProducersViewProps {
  producers: Producer[];
  clients: Client[];
  selectedProducer: Producer | null;
  onBack: () => void;
  onSelectProducer: (producer: Producer) => void;
  onAddClient?: (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producerId: number;
  }) => void;
}

const ProducersView = ({
  producers,
  clients: initialClients,
  selectedProducer,
  onBack,
  onSelectProducer,
  onAddClient,
}: ProducersViewProps) => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const { toast } = useToast();
  
  const filteredClients = initialClients.filter(
    client => client.producerId === selectedProducer?.id
  );

  const { 
    clients, 
    toggleClientStatus, 
    updateClientContracts, 
    toggleAlgoTrading 
  } = useClientManagement(filteredClients);

  const handleAddClient = (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producerId: number;
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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Produtores</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
          <div className="space-y-2">
            {producers.map((producer) => (
              <Button
                key={producer.id}
                variant={selectedProducer?.id === producer.id ? "default" : "outline"}
                className="w-full justify-start"
                onClick={() => onSelectProducer(producer)}
              >
                {producer.name}
              </Button>
            ))}
          </div>
        </Card>

        {selectedProducer && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Clientes de {selectedProducer.name}</h2>
              <AddClientDialog
                isOpen={isAddClientOpen}
                onOpenChange={setIsAddClientOpen}
                onAddClient={handleAddClient}
                producerId={selectedProducer.id}
              />
            </div>
            <div className="space-y-4">
              <ClientManagementTable 
                clients={clients}
                onToggleStatus={toggleClientStatus}
                onUpdateContracts={updateClientContracts}
                onToggleAlgoTrading={toggleAlgoTrading}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProducersView;


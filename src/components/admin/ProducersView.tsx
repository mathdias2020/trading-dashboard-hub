
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import ProducersList from "./producers/ProducersList";
import ClientsManagement from "./producers/ClientsManagement";

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
  const filteredClients = initialClients.filter(
    client => client.producerId === selectedProducer?.id
  );

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
        <ProducersList 
          producers={producers}
          selectedProducer={selectedProducer}
          onSelectProducer={onSelectProducer}
        />

        {selectedProducer && (
          <ClientsManagement
            selectedProducer={selectedProducer}
            clients={filteredClients}
            onAddClient={onAddClient}
          />
        )}
      </div>
    </div>
  );
};

export default ProducersView;

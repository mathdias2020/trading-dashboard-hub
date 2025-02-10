
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Producer, Client, NewClientData } from "@/types/admin";
import { ProducerList } from "./producers/ProducerList";
import { AddProducerDialog } from "./producers/AddProducerDialog";
import { ClientsList } from "./producers/ClientsList";

interface ProducersManagementProps {
  producers: Producer[];
  clients: Client[];
  selectedProducer: Producer | null;
  isAddProducerDialogOpen: boolean;
  isAddClientDialogOpen: boolean;
  newProducerData: {
    email: string;
    password: string;
  };
  newClientData: NewClientData;
  onBack: () => void;
  onSelectProducer: (producer: Producer) => void;
  onAddProducer: () => void;
  onEditProducer: (producer: Producer, data: any) => void;
  onAddClient: () => void;
  onAddProducerDialogOpenChange: (open: boolean) => void;
  onAddClientDialogOpenChange: (open: boolean) => void;
  onNewProducerDataChange: (data: any) => void;
  onNewClientDataChange: (data: any) => void;
}

export const ProducersManagement = ({
  producers,
  clients,
  selectedProducer,
  isAddProducerDialogOpen,
  isAddClientDialogOpen,
  newProducerData,
  newClientData,
  onBack,
  onSelectProducer,
  onAddProducer,
  onEditProducer,
  onAddClient,
  onAddProducerDialogOpenChange,
  onAddClientDialogOpenChange,
  onNewProducerDataChange,
  onNewClientDataChange,
}: ProducersManagementProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Produtores</h1>
        <div className="ml-auto">
          <AddProducerDialog
            isOpen={isAddProducerDialogOpen}
            onOpenChange={onAddProducerDialogOpenChange}
            onAddProducer={onAddProducer}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ProducerList
          producers={producers}
          selectedProducer={selectedProducer}
          onSelectProducer={onSelectProducer}
          onEditProducer={onEditProducer}
        />

        {selectedProducer && (
          <ClientsList
            selectedProducer={selectedProducer}
            clients={clients}
            isAddClientDialogOpen={isAddClientDialogOpen}
            newClientData={newClientData}
            onAddClientDialogOpenChange={onAddClientDialogOpenChange}
            onNewClientDataChange={onNewClientDataChange}
            onAddClient={onAddClient}
          />
        )}
      </div>
    </div>
  );
};

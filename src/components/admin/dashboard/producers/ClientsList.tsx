
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Client, Producer, NewClientData } from "@/types/admin";
import { AddClientForm } from "./AddClientForm";
import { ClientCard } from "./ClientCard";

interface ClientsListProps {
  selectedProducer: Producer;
  clients: Client[];
  isAddClientDialogOpen: boolean;
  newClientData: NewClientData;
  onAddClientDialogOpenChange: (open: boolean) => void;
  onNewClientDataChange: (data: NewClientData) => void;
  onAddClient: () => void;
}

export const ClientsList = ({
  selectedProducer,
  clients,
  isAddClientDialogOpen,
  onAddClientDialogOpenChange,
  onNewClientDataChange,
  onAddClient,
}: ClientsListProps) => {
  const handleFormSubmit = (data: NewClientData) => {
    onNewClientDataChange(data);
    onAddClient();
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Clientes de {selectedProducer.name}</h2>
        <Dialog open={isAddClientDialogOpen} onOpenChange={onAddClientDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>Adicionar Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <AddClientForm onSubmit={handleFormSubmit} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {clients
          .filter(client => client.producerId === selectedProducer.id)
          .map(client => (
            <ClientCard key={client.id} client={client} />
          ))}
      </div>
    </Card>
  );
};


import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Producer, Client, NewClientData } from "@/types/admin";

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
          <Dialog open={isAddProducerDialogOpen} onOpenChange={onAddProducerDialogOpenChange}>
            <DialogTrigger asChild>
              <Button>Adicionar Produtor</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produtor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="producer-email">Email</Label>
                  <Input
                    id="producer-email"
                    type="email"
                    value={newProducerData.email}
                    onChange={(e) => onNewProducerDataChange({ ...newProducerData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="producer-password">Senha Inicial</Label>
                  <Input
                    id="producer-password"
                    type="password"
                    value={newProducerData.password}
                    onChange={(e) => onNewProducerDataChange({ ...newProducerData, password: e.target.value })}
                  />
                </div>
                <Button 
                  className="w-full" 
                  onClick={onAddProducer}
                >
                  Adicionar Produtor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
              <Dialog open={isAddClientDialogOpen} onOpenChange={onAddClientDialogOpenChange}>
                <DialogTrigger asChild>
                  <Button>Adicionar Cliente</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Cliente</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="client-name">Nome</Label>
                      <Input
                        id="client-name"
                        value={newClientData.name}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-email">Email</Label>
                      <Input
                        id="client-email"
                        type="email"
                        value={newClientData.email}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client-password">Senha Inicial</Label>
                      <Input
                        id="client-password"
                        type="password"
                        value={newClientData.password}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, password: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mt5-account">Conta MT5</Label>
                      <Input
                        id="mt5-account"
                        value={newClientData.mt5Account}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, mt5Account: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mt5-password">Senha MT5</Label>
                      <Input
                        id="mt5-password"
                        type="password"
                        value={newClientData.mt5Password}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, mt5Password: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-contracts">Contratos</Label>
                      <Input
                        id="max-contracts"
                        type="number"
                        min="1"
                        value={newClientData.maxContracts}
                        onChange={(e) => onNewClientDataChange({ ...newClientData, maxContracts: parseInt(e.target.value) })}
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={onAddClient}
                    >
                      Adicionar Cliente
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {clients
                .filter(client => client.producerId === selectedProducer.id)
                .map(client => (
                  <Card key={client.id} className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">Conta: {client.accountNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">R$ {client.monthlyResult.toLocaleString()}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {client.status}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

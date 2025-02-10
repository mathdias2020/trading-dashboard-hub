
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Producer } from "@/types/admin";

interface ProducersListProps {
  producers: Producer[];
  selectedProducer: Producer | null;
  isDialogOpen: boolean;
  newClientData: {
    name: string;
    email: string;
    password: string;
    mt5Account: string;
    mt5Password: string;
    maxContracts: number;
  };
  onSelectProducer: (producer: Producer) => void;
  onAddClient: () => void;
  onNewClientDataChange: (data: any) => void;
  onDialogOpenChange: (open: boolean) => void;
}

export const ProducersList = ({
  producers,
  selectedProducer,
  isDialogOpen,
  newClientData,
  onSelectProducer,
  onAddClient,
  onNewClientDataChange,
  onDialogOpenChange,
}: ProducersListProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Clientes</th>
              <th className="text-left p-2">Receita</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {producers.map((producer) => (
              <tr key={producer.id} className="border-b">
                <td className="p-2">{producer.name}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    producer.status === "Ativo" ? "bg-green-100 text-green-800" :
                    producer.status === "Pendente" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {producer.status}
                  </span>
                </td>
                <td className="p-2">{producer.clients}</td>
                <td className="p-2">R$ {producer.revenue.toLocaleString()}</td>
                <td className="p-2">
                  <Dialog open={isDialogOpen && selectedProducer?.id === producer.id} onOpenChange={onDialogOpenChange}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onSelectProducer(producer)}
                      >
                        Adicionar Cliente
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Cliente para {producer.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input
                            id="name"
                            value={newClientData.name}
                            onChange={(e) => onNewClientDataChange({ ...newClientData, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newClientData.email}
                            onChange={(e) => onNewClientDataChange({ ...newClientData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Senha Inicial</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newClientData.password}
                            onChange={(e) => onNewClientDataChange({ ...newClientData, password: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mt5Account">Conta MT5</Label>
                          <Input
                            id="mt5Account"
                            value={newClientData.mt5Account}
                            onChange={(e) => onNewClientDataChange({ ...newClientData, mt5Account: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="mt5Password">Senha MT5</Label>
                          <Input
                            id="mt5Password"
                            type="password"
                            value={newClientData.mt5Password}
                            onChange={(e) => onNewClientDataChange({ ...newClientData, mt5Password: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxContracts">Contratos</Label>
                          <Input
                            id="maxContracts"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

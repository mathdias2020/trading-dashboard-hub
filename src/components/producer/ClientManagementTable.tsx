
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type Client = {
  id: number;
  name: string;
  status: string;
  subscriptionDate: string;
  contracts: number;
  maxContracts: number;
  algoTrading: boolean;
  mt5Balance: number;
  result: number;
};

interface ClientManagementTableProps {
  clients: Client[];
  onUpdateClient: (clients: Client[]) => void;
}

export const ClientManagementTable = ({ clients, onUpdateClient }: ClientManagementTableProps) => {
  const { toast } = useToast();

  const toggleClientStatus = (clientId: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const newStatus = client.status === "Ativo" ? "Inativo" : "Ativo";
        toast({
          title: "Status alterado",
          description: `Status do cliente ${client.name} alterado para ${newStatus}`,
        });
        return { ...client, status: newStatus };
      }
      return client;
    });
    onUpdateClient(updatedClients);
  };

  const updateClientContracts = (clientId: number, maxContracts: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        toast({
          title: "Contratos atualizados",
          description: `Limite de contratos do cliente ${client.name} atualizado para ${maxContracts}`,
        });
        return { ...client, maxContracts };
      }
      return client;
    });
    onUpdateClient(updatedClients);
  };

  const toggleAlgoTrading = (clientId: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const newAlgoTrading = !client.algoTrading;
        toast({
          title: "AlgoTrading alterado",
          description: `AlgoTrading do cliente ${client.name} ${newAlgoTrading ? 'ativado' : 'desativado'}`,
        });
        return { ...client, algoTrading: newAlgoTrading };
      }
      return client;
    });
    onUpdateClient(updatedClients);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Data de Assinatura</TableHead>
            <TableHead>Contratos</TableHead>
            <TableHead>Limite de Contratos</TableHead>
            <TableHead>AlgoTrading</TableHead>
            <TableHead>Saldo MT5</TableHead>
            <TableHead>Resultado</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {client.status}
                </span>
              </TableCell>
              <TableCell>{new Date(client.subscriptionDate).toLocaleDateString()}</TableCell>
              <TableCell>{client.contracts}</TableCell>
              <TableCell>{client.maxContracts}</TableCell>
              <TableCell>
                <Switch
                  checked={client.algoTrading}
                  onCheckedChange={() => toggleAlgoTrading(client.id)}
                />
              </TableCell>
              <TableCell>R$ {client.mt5Balance.toLocaleString()}</TableCell>
              <TableCell>
                <span className={client.result >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {client.result.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={client.status === "Ativo"}
                    onCheckedChange={() => toggleClientStatus(client.id)}
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Editar Limites
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Editar Limite de Contratos</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label>Limite de Contratos</label>
                          <Input
                            type="number"
                            defaultValue={client.maxContracts}
                            min={1}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              if (value < 1) {
                                toast({
                                  title: "Erro",
                                  description: "O limite mínimo é 1 contrato",
                                  variant: "destructive",
                                });
                                return;
                              }
                              updateClientContracts(client.id, value);
                            }}
                          />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

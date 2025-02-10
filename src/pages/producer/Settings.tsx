
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
import { Switch } from "@/components/ui/switch";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ProducerSettings = () => {
  const { toast } = useToast();
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

  const toggleClientStatus = (clientId: number) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        const newStatus = client.status === "Ativo" ? "Inativo" : "Ativo";
        toast({
          title: "Status alterado",
          description: `Status do cliente ${client.name} alterado para ${newStatus}`,
        });
        return { ...client, status: newStatus };
      }
      return client;
    }));
  };

  const updateClientContracts = (clientId: number, maxContracts: number) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        toast({
          title: "Contratos atualizados",
          description: `Limite de contratos do cliente ${client.name} atualizado para ${maxContracts}`,
        });
        return { ...client, maxContracts };
      }
      return client;
    }));
  };

  const toggleAlgoTrading = (clientId: number) => {
    setClients(clients.map(client => {
      if (client.id === clientId) {
        const newAlgoTrading = !client.algoTrading;
        toast({
          title: "AlgoTrading alterado",
          description: `AlgoTrading do cliente ${client.name} ${newAlgoTrading ? 'ativado' : 'desativado'}`,
        });
        return { ...client, algoTrading: newAlgoTrading };
      }
      return client;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/producer/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Configurações</h1>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Gerenciar Clientes</h2>
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
      </Card>
    </div>
  );
};

export default ProducerSettings;


import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
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
import { type Client } from "@/hooks/use-client-management";

interface ClientManagementTableProps {
  clients: Client[];
  onToggleStatus: (clientId: number) => void;
  onUpdateContracts: (clientId: number, maxContracts: number) => void;
  onToggleAlgoTrading: (clientId: number) => void;
}

export const ClientManagementTable = ({ 
  clients, 
  onToggleStatus,
  onUpdateContracts,
  onToggleAlgoTrading,
}: ClientManagementTableProps) => {
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
                  onCheckedChange={() => onToggleAlgoTrading(client.id)}
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
                    onCheckedChange={() => onToggleStatus(client.id)}
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
                              if (value >= 1) {
                                onUpdateContracts(client.id, value);
                              }
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


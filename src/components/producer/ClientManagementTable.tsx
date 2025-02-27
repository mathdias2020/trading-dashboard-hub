
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Client } from "@/types/client";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from "@/hooks/use-notifications";
import { Pencil } from "lucide-react";

interface ClientManagementTableProps {
  clients: Client[];
  onToggleStatus?: (clientId: string) => void;
  onUpdateContracts?: (clientId: string, maxContracts: number) => void;
  onToggleAlgoTrading?: (clientId: string) => void;
}

export const ClientManagementTable = ({ 
  clients,
  onToggleStatus,
  onUpdateContracts,
  onToggleAlgoTrading 
}: ClientManagementTableProps) => {
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [newMaxContracts, setNewMaxContracts] = useState<number>(0);
  const { toast } = useToast();
  const { addLimitChangeNotification } = useNotifications();

  const handleEditClick = (client: Client) => {
    setEditingClientId(client.id);
    setNewMaxContracts(client.max_contracts || 0);
  };

  const handleSaveClick = (client: Client) => {
    if (onUpdateContracts && newMaxContracts >= 0) {
      onUpdateContracts(client.id, newMaxContracts);
      addLimitChangeNotification(client.name, "Produtor");
      setEditingClientId(null);
    } else {
      toast({
        title: "Erro",
        description: "O número de contratos deve ser maior ou igual a zero",
        variant: "destructive"
      });
    }
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
              <TableCell>{new Date(client.subscription_date || '').toLocaleDateString()}</TableCell>
              <TableCell>{client.contracts}</TableCell>
              <TableCell>
                {editingClientId === client.id ? (
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      value={newMaxContracts}
                      onChange={(e) => setNewMaxContracts(Number(e.target.value))}
                      className="w-20"
                      min={0}
                    />
                    <Button 
                      size="sm"
                      onClick={() => handleSaveClick(client)}
                    >
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>{client.max_contracts}</span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditClick(client)}
                      className="h-8 w-8 p-0 hover:bg-slate-100 transition-colors"
                    >
                      <Pencil className="h-4 w-4 text-slate-500" />
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  client.algo_trading ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {client.algo_trading ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell>R$ {client.mt5_balance?.toLocaleString()}</TableCell>
              <TableCell>
                <span className={client.monthly_result >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {client.monthly_result?.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

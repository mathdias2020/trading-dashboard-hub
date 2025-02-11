
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

interface ClientManagementTableProps {
  clients: Client[];
  onToggleStatus?: (clientId: number) => void;
  onUpdateContracts?: (clientId: number, maxContracts: number) => void;
  onToggleAlgoTrading?: (clientId: number) => void;
}

export const ClientManagementTable = ({ 
  clients,
  onToggleStatus,
  onUpdateContracts,
  onToggleAlgoTrading 
}: ClientManagementTableProps) => {
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [newMaxContracts, setNewMaxContracts] = useState<number>(0);
  const { toast } = useToast();
  const { addLimitChangeNotification } = useNotifications();

  const handleEditClick = (client: Client) => {
    setEditingClientId(client.id);
    setNewMaxContracts(client.maxContracts || 0);
  };

  const handleSaveClick = (client: Client) => {
    if (onUpdateContracts && newMaxContracts >= 0) {
      onUpdateContracts(client.id, newMaxContracts);
      addLimitChangeNotification(client.name, "Produtor"); // Notifica o admin sobre a mudança
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
              <TableCell>{new Date(client.subscriptionDate || '').toLocaleDateString()}</TableCell>
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
                    <span>{client.maxContracts}</span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditClick(client)}
                    >
                      Editar
                    </Button>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  client.algoTrading ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {client.algoTrading ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell>R$ {client.mt5Balance?.toLocaleString()}</TableCell>
              <TableCell>
                <span className={client.result && client.result >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {client.result?.toLocaleString()}
                </span>
              </TableCell>
              <TableCell>
                {onToggleStatus && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(client.id)}
                  >
                    {client.status === "Ativo" ? "Desativar" : "Ativar"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};



import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "@/types/client";

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
              <TableCell>{new Date(client.subscriptionDate).toLocaleDateString()}</TableCell>
              <TableCell>{client.contracts}</TableCell>
              <TableCell>{client.maxContracts}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  client.algoTrading ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}>
                  {client.algoTrading ? "Ativo" : "Inativo"}
                </span>
              </TableCell>
              <TableCell>R$ {client.mt5Balance.toLocaleString()}</TableCell>
              <TableCell>
                <span className={client.result >= 0 ? "text-green-600" : "text-red-600"}>
                  R$ {client.result.toLocaleString()}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

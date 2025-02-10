
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Client {
  id: number;
  name: string;
  account: string;
  status: string;
  maxContracts: number;
}

interface ClientSettingsProps {
  clients: Client[];
  onStatusChange: (clientId: number) => void;
  onMaxContractsChange: (clientId: number, value: string) => void;
}

const ClientSettings = ({ clients, onStatusChange, onMaxContractsChange }: ClientSettingsProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Gerenciar Clientes</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Máximo de Contratos</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.account}</TableCell>
                <TableCell>
                  <Button
                    variant={client.status === "Ativo" ? "default" : "secondary"}
                    size="sm"
                    onClick={() => onStatusChange(client.id)}
                  >
                    {client.status}
                  </Button>
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={client.maxContracts}
                    onChange={(e) => onMaxContractsChange(client.id, e.target.value)}
                    className="w-20"
                    min="1"
                  />
                </TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm">
                    Remover
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ClientSettings;

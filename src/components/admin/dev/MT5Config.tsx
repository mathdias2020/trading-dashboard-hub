
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MT5ConfigProps {
  savedEndpoints: string[];
  onSaveEndpoint: (endpoint: string) => void;
  onTestEndpoint: (endpoint: string) => void;
}

export const MT5Config = ({ savedEndpoints, onSaveEndpoint, onTestEndpoint }: MT5ConfigProps) => {
  const { toast } = useToast();
  const [mt5Endpoint, setMt5Endpoint] = useState("");

  const handleSaveMT5Endpoint = () => {
    if (!mt5Endpoint) return;
    onSaveEndpoint(mt5Endpoint);
    setMt5Endpoint("");
    toast({
      title: "Endpoint MT5 adicionado",
      description: "O endpoint foi salvo com sucesso",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Configuração API MT5</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="mt5-endpoint">Novo Endpoint MT5</Label>
          <div className="flex gap-2">
            <Input
              id="mt5-endpoint"
              placeholder="https://api.mt5.exemplo.com"
              value={mt5Endpoint}
              onChange={(e) => setMt5Endpoint(e.target.value)}
            />
            <Button onClick={handleSaveMT5Endpoint}>Adicionar</Button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Endpoints Configurados</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {savedEndpoints.map((endpoint, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{endpoint}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                      Aguardando teste
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onTestEndpoint(endpoint)}
                    >
                      Testar Conexão
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold">Dados Disponíveis</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
            <li>Saldo MT5</li>
            <li>Retorno diário</li>
            <li>Status AlgoTrading</li>
            <li>Número da conta</li>
            <li>Nome da conta</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

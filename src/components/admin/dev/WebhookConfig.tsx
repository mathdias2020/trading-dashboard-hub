
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

interface WebhookConfigProps {
  webhookUrl: string;
  savedEndpoints: string[];
  onSaveEndpoint: (endpoint: string) => void;
  onTestEndpoint: (endpoint: string) => void;
  onCopyWebhookUrl: () => void;
}

export const WebhookConfig = ({
  webhookUrl,
  savedEndpoints,
  onSaveEndpoint,
  onTestEndpoint,
  onCopyWebhookUrl,
}: WebhookConfigProps) => {
  const { toast } = useToast();
  const [webhookEndpoint, setWebhookEndpoint] = useState("");

  const handleSaveWebhook = () => {
    if (!webhookEndpoint) return;
    onSaveEndpoint(webhookEndpoint);
    setWebhookEndpoint("");
    toast({
      title: "Webhook adicionado",
      description: "O webhook foi salvo com sucesso",
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Configuração de Webhooks</h2>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 rounded-lg border">
          <Label className="text-sm font-medium">Seu URL de Webhook</Label>
          <div className="mt-2 flex items-center gap-2">
            <Input value={webhookUrl} readOnly className="bg-white font-mono text-sm" />
            <Button onClick={onCopyWebhookUrl} variant="outline">
              Copiar
            </Button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Use este URL para configurar o webhook no seu processador de pagamentos.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="webhook-endpoint">Novo Webhook</Label>
          <div className="flex gap-2">
            <Input
              id="webhook-endpoint"
              placeholder="https://webhook.exemplo.com/pagamentos"
              value={webhookEndpoint}
              onChange={(e) => setWebhookEndpoint(e.target.value)}
            />
            <Button onClick={handleSaveWebhook}>Adicionar</Button>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Webhooks Configurados</h3>
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
          <h3 className="text-lg font-semibold">Integrações</h3>
          <div className="text-sm text-gray-600">
            <p>Webhook configurado para receber notificações de:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Status de pagamento de mensalidades</li>
              <li>Atualizações de assinatura</li>
              <li>Cancelamentos</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};

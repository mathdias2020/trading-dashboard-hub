
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminDev = () => {
  const { toast } = useToast();
  const [mt5Endpoint, setMt5Endpoint] = useState("");
  const [webhookEndpoint, setWebhookEndpoint] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  // Estado para simular endpoints salvos
  const [savedEndpoints, setSavedEndpoints] = useState<{
    mt5: string[];
    webhooks: string[];
  }>({
    mt5: [],
    webhooks: [],
  });

  // Gera um URL único para webhook quando o componente monta
  useEffect(() => {
    const uniqueId = crypto.randomUUID();
    const baseUrl = window.location.origin;
    setWebhookUrl(`${baseUrl}/api/webhook/${uniqueId}`);
  }, []);

  const handleSaveMT5Endpoint = () => {
    if (!mt5Endpoint) return;
    setSavedEndpoints(prev => ({
      ...prev,
      mt5: [...prev.mt5, mt5Endpoint]
    }));
    setMt5Endpoint("");
    toast({
      title: "Endpoint MT5 adicionado",
      description: "O endpoint foi salvo com sucesso",
    });
  };

  const handleSaveWebhook = () => {
    if (!webhookEndpoint) return;
    setSavedEndpoints(prev => ({
      ...prev,
      webhooks: [...prev.webhooks, webhookEndpoint]
    }));
    setWebhookEndpoint("");
    toast({
      title: "Webhook adicionado",
      description: "O webhook foi salvo com sucesso",
    });
  };

  const handleCopyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "URL copiado",
      description: "O URL do webhook foi copiado para a área de transferência",
    });
  };

  const handleTestEndpoint = (endpoint: string) => {
    toast({
      title: "Testando conexão",
      description: `Tentando conectar com: ${endpoint}`,
    });
    // Aqui você implementaria a lógica real de teste
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Configurações de Desenvolvimento</h1>

      <Tabs defaultValue="mt5" className="w-full">
        <TabsList>
          <TabsTrigger value="mt5">API MT5</TabsTrigger>
          <TabsTrigger value="webhook">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="mt5">
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
                    {savedEndpoints.mt5.map((endpoint, index) => (
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
                            onClick={() => handleTestEndpoint(endpoint)}
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
        </TabsContent>

        <TabsContent value="webhook">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Configuração de Webhooks</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg border">
                <Label className="text-sm font-medium">Seu URL de Webhook</Label>
                <div className="mt-2 flex items-center gap-2">
                  <Input value={webhookUrl} readOnly className="bg-white font-mono text-sm" />
                  <Button onClick={handleCopyWebhookUrl} variant="outline">
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
                    {savedEndpoints.webhooks.map((endpoint, index) => (
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
                            onClick={() => handleTestEndpoint(endpoint)}
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDev;

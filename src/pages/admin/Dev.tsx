
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MT5Config } from "@/components/admin/dev/MT5Config";
import { WebhookConfig } from "@/components/admin/dev/WebhookConfig";

const AdminDev = () => {
  const { toast } = useToast();
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

  const handleSaveMT5Endpoint = (endpoint: string) => {
    setSavedEndpoints(prev => ({
      ...prev,
      mt5: [...prev.mt5, endpoint]
    }));
  };

  const handleSaveWebhook = (endpoint: string) => {
    setSavedEndpoints(prev => ({
      ...prev,
      webhooks: [...prev.webhooks, endpoint]
    }));
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
          <MT5Config
            savedEndpoints={savedEndpoints.mt5}
            onSaveEndpoint={handleSaveMT5Endpoint}
            onTestEndpoint={handleTestEndpoint}
          />
        </TabsContent>

        <TabsContent value="webhook">
          <WebhookConfig
            webhookUrl={webhookUrl}
            savedEndpoints={savedEndpoints.webhooks}
            onSaveEndpoint={handleSaveWebhook}
            onTestEndpoint={handleTestEndpoint}
            onCopyWebhookUrl={handleCopyWebhookUrl}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDev;


import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ClientDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({
    account: "123",
    password: "1234",
    contracts: 1
  });

  const clientData = {
    name: "Ana Costa",
    status: "Ativo",
    producer: "João Silva",
    lastOperation: "2024-02-09",
    monthlyReturn: 1200,
    producerContractLimit: 10,
    algoTrading: true,
    mt5Balance: 15000,
  };

  const operations = [
    { id: 1, date: "2024-02-09", type: "Compra", symbol: "PETR4", result: 500 },
    { id: 2, date: "2024-02-08", type: "Venda", symbol: "VALE3", result: -200 },
    { id: 3, date: "2024-02-07", type: "Compra", symbol: "ITUB4", result: 900 },
  ];

  const capitalCurveData = [
    { date: "2024-02-04", value: -50 },
    { date: "2024-02-05", value: 100 },
    { date: "2024-02-06", value: 150 },
    { date: "2024-02-06", value: 120 },
    { date: "2024-02-06", value: 280 },
    { date: "2024-02-06", value: 320 },
    { date: "2024-02-07", value: 400 },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.contracts > clientData.producerContractLimit) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar contratos",
        description: `O número máximo de contratos permitido é ${clientData.producerContractLimit}`
      });
      return;
    }
    toast({
      title: "Configurações atualizadas",
      description: "Suas alterações foram salvas com sucesso"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Conta</h1>
        <div className="flex items-center space-x-4">
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
          <div className="text-sm text-muted-foreground">Bem-vindo(a), {clientData.name}</div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="p-4">
              <h3 className="font-semibold">Contratos</h3>
              <p className="text-2xl">{formData.contracts}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">Retorno Mensal</h3>
              <p className="text-2xl">R$ {clientData.monthlyReturn.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">Saldo MT5</h3>
              <p className="text-2xl">R$ {clientData.mt5Balance.toLocaleString()}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold">Status</h3>
              <p className="mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  clientData.algoTrading ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                }`}>
                  AlgoTrading {clientData.algoTrading ? "Ativo" : "Inativo"}
                </span>
              </p>
            </Card>
          </div>

          <CapitalCurveChart data={capitalCurveData} />

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Últimas Operações</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Data</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Ativo</th>
                    <th className="text-left p-2">Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  {operations.map((op) => (
                    <tr key={op.id} className="border-b">
                      <td className="p-2">{new Date(op.date).toLocaleDateString()}</td>
                      <td className="p-2">{op.type}</td>
                      <td className="p-2">{op.symbol}</td>
                      <td className="p-2">
                        <span className={op.result > 0 ? "text-green-600" : "text-red-600"}>
                          R$ {op.result.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Configurações da Conta</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Conta</label>
                <Input 
                  value={formData.account} 
                  onChange={(e) => setFormData({...formData, account: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Senha</label>
                <Input 
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Contratos</label>
                <Input 
                  type="number"
                  min="1"
                  max={clientData.producerContractLimit}
                  value={formData.contracts}
                  onChange={(e) => setFormData({...formData, contracts: parseInt(e.target.value)})}
                  className="mt-1"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Limite máximo: {clientData.producerContractLimit} contratos
                </p>
              </div>
              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;

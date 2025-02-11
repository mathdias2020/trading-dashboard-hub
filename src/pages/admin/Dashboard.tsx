
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Producer = {
  id: number;
  name: string;
  status: string;
  clients: number;
  revenue: number;
  email?: string;
};

type Client = {
  id: number;
  name: string;
  accountNumber: string;
  monthlyResult: number;
  status: string;
  producerId: number;
};

type Notification = {
  id: number;
  type: "producer" | "client";
  message: string;
  date: string;
  status: "pending" | "resolved";
};

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "notifications">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isAddProducerOpen, setIsAddProducerOpen] = useState(false);
  const [newProducer, setNewProducer] = useState({
    name: "",
    email: "",
    initialPassword: "",
  });
  const { toast } = useToast();

  const [producers, setProducers] = useState<Producer[]>([
    { id: 1, name: "João Silva", status: "Ativo", clients: 15, revenue: 25000, email: "joao@example.com" },
    { id: 2, name: "Maria Santos", status: "Pendente", clients: 8, revenue: 12000, email: "maria@example.com" },
    { id: 3, name: "Pedro Oliveira", status: "Inativo", clients: 0, revenue: 0, email: "pedro@example.com" },
  ]);

  const clients: Client[] = [
    { id: 1, name: "Cliente 1", accountNumber: "001", monthlyResult: 1500, status: "Ativo", producerId: 1 },
    { id: 2, name: "Cliente 2", accountNumber: "002", monthlyResult: 2500, status: "Ativo", producerId: 1 },
    { id: 3, name: "Cliente 3", accountNumber: "003", monthlyResult: 1800, status: "Pendente", producerId: 2 },
  ];

  const notifications: Notification[] = [
    { id: 1, type: "producer", message: "Novo produtor aguardando aprovação: Maria Santos", date: "2024-03-20", status: "pending" },
    { id: 2, type: "client", message: "Cliente solicitou alteração de dados bancários", date: "2024-03-19", status: "pending" },
  ];

  const handleAddProducer = () => {
    if (!newProducer.name || !newProducer.email || !newProducer.initialPassword) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    const newId = producers.length + 1;
    const producerToAdd: Producer = {
      id: newId,
      name: newProducer.name,
      email: newProducer.email,
      status: "Pendente",
      clients: 0,
      revenue: 0,
    };

    setProducers([...producers, producerToAdd]);
    setNewProducer({ name: "", email: "", initialPassword: "" });
    setIsAddProducerOpen(false);

    toast({
      title: "Produtor adicionado",
      description: `${newProducer.name} foi adicionado como produtor`,
    });
  };

  const handleSelectProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    toast({
      title: "Produtor selecionado",
      description: `Visualizando clientes de ${producer.name}`,
    });
  };

  const handleResolveNotification = (id: number) => {
    toast({
      title: "Notificação resolvida",
      description: "A notificação foi marcada como resolvida",
    });
  };

  if (currentView === "overview") {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="space-x-4">
            <Button onClick={() => setCurrentView("producers")}>Produtores</Button>
            <Button onClick={() => setCurrentView("notifications")}>Avisos</Button>
            <Button variant="outline" onClick={() => window.location.href = "/admin/dev"}>
              Dev Settings
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <h3 className="font-semibold">Produtores Ativos</h3>
            <p className="text-2xl">{producers.filter(p => p.status === "Ativo").length}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Total de Clientes</h3>
            <p className="text-2xl">{producers.reduce((acc, p) => acc + p.clients, 0)}</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold">Receita Total</h3>
            <p className="text-2xl">R$ {producers.reduce((acc, p) => acc + p.revenue, 0).toLocaleString()}</p>
          </Card>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Lista de Produtores</h2>
          <Dialog open={isAddProducerOpen} onOpenChange={setIsAddProducerOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Adicionar Produtor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Produtor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Nome</label>
                  <Input
                    value={newProducer.name}
                    onChange={(e) => setNewProducer({ ...newProducer, name: e.target.value })}
                    placeholder="Nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <label>Email</label>
                  <Input
                    type="email"
                    value={newProducer.email}
                    onChange={(e) => setNewProducer({ ...newProducer, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <label>Senha Inicial</label>
                  <Input
                    type="password"
                    value={newProducer.initialPassword}
                    onChange={(e) => setNewProducer({ ...newProducer, initialPassword: e.target.value })}
                    placeholder="Senha inicial"
                  />
                </div>
                <Button onClick={handleAddProducer} className="w-full">
                  Adicionar Produtor
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Clientes</th>
                  <th className="text-left p-2">Receita</th>
                </tr>
              </thead>
              <tbody>
                {producers.map((producer) => (
                  <tr key={producer.id} className="border-b">
                    <td className="p-2">{producer.name}</td>
                    <td className="p-2">{producer.email}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        producer.status === "Ativo" ? "bg-green-100 text-green-800" :
                        producer.status === "Pendente" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {producer.status}
                      </span>
                    </td>
                    <td className="p-2">{producer.clients}</td>
                    <td className="p-2">R$ {producer.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  }

  if (currentView === "producers") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => {
            setCurrentView("overview");
            setSelectedProducer(null);
          }}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Produtores</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
            <div className="space-y-2">
              {producers.map((producer) => (
                <Button
                  key={producer.id}
                  variant={selectedProducer?.id === producer.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleSelectProducer(producer)}
                >
                  {producer.name}
                </Button>
              ))}
            </div>
          </Card>

          {selectedProducer && (
            <Card className="p-4">
              <h2 className="text-xl font-semibold mb-4">Clientes de {selectedProducer.name}</h2>
              <div className="space-y-4">
                {clients
                  .filter(client => client.producerId === selectedProducer.id)
                  .map(client => (
                    <Card key={client.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">Conta: {client.accountNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">R$ {client.monthlyResult.toLocaleString()}</p>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {client.status}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    );
  }

  if (currentView === "notifications") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setCurrentView("overview")}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Avisos</h1>
        </div>

        <Tabs defaultValue="producers">
          <TabsList>
            <TabsTrigger value="producers">Produtores</TabsTrigger>
            <TabsTrigger value="clients">Clientes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="producers">
            <Card className="p-4">
              <div className="space-y-4">
                {notifications
                  .filter(notification => notification.type === "producer")
                  .map(notification => (
                    <Card key={notification.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{notification.message}</p>
                          <p className="text-sm text-muted-foreground">{notification.date}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleResolveNotification(notification.id)}
                        >
                          Resolver
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="p-4">
              <div className="space-y-4">
                {notifications
                  .filter(notification => notification.type === "client")
                  .map(notification => (
                    <Card key={notification.id} className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{notification.message}</p>
                          <p className="text-sm text-muted-foreground">{notification.date}</p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => handleResolveNotification(notification.id)}
                        >
                          Resolver
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return null;
};

export default AdminDashboard;


import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Producer = {
  id: string;
  name: string;
  status: string;
  clients: number;
  revenue: number;
  document_verified: boolean;
};

type Client = {
  id: string;
  name: string;
  accountNumber: string;
  monthlyResult: number;
  status: string;
  producerId: string;
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
  const [producers, setProducers] = useState<Producer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddProducerDialogOpen, setIsAddProducerDialogOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
  });
  const [newProducerData, setNewProducerData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const notifications: Notification[] = [
    { id: 1, type: "producer", message: "Novo produtor aguardando aprovação", date: "2024-03-20", status: "pending" },
    { id: 2, type: "client", message: "Cliente solicitou alteração de dados bancários", date: "2024-03-19", status: "pending" },
  ];

  useEffect(() => {
    fetchProducers();
  }, []);

  const fetchProducers = async () => {
    try {
      const { data: producersData, error: producersError } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          producers!inner (
            document_verified,
            business_info
          )
        `)
        .eq('role', 'producer');

      if (producersError) throw producersError;

      const formattedProducers = producersData.map(producer => ({
        id: producer.id,
        name: producer.name || 'Sem nome',
        status: producer.producers?.document_verified ? "Ativo" : "Pendente",
        clients: 0,
        revenue: 0,
        document_verified: producer.producers?.document_verified || false
      }));

      setProducers(formattedProducers);

      // Fetch clients count for each producer
      for (const producer of formattedProducers) {
        const { count } = await supabase
          .from('producer_clients')
          .select('*', { count: 'exact' })
          .eq('producer_id', producer.id);

        producer.clients = count || 0;
      }

      setProducers([...formattedProducers]);
    } catch (error) {
      console.error('Error fetching producers:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os produtores",
      });
    }
  };

  const handleAddClient = async (producerId: string) => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newClientData.email,
        password: newClientData.password,
        options: {
          data: {
            name: newClientData.name,
            role: 'client',
            cpf: newClientData.cpf,
            phone: newClientData.phone,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Create producer-client relationship
        const { error: relationError } = await supabase
          .from('producer_clients')
          .insert([{
            producer_id: producerId,
            client_id: authData.user.id,
          }]);

        if (relationError) throw relationError;

        toast({
          title: "Cliente adicionado",
          description: "O cliente foi vinculado ao produtor com sucesso",
        });

        setIsDialogOpen(false);
        fetchProducers();
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar o cliente",
      });
    }
  };

  const handleAddProducer = async () => {
    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newProducerData.email,
        password: newProducerData.password,
        options: {
          data: {
            role: 'producer',
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        toast({
          title: "Produtor adicionado",
          description: "O produtor foi adicionado com sucesso. Ele poderá completar seu cadastro no primeiro acesso.",
        });

        setIsAddProducerDialogOpen(false);
        fetchProducers();
      }
    } catch (error) {
      console.error('Error adding producer:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar o produtor",
      });
    }
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

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Nome</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Clientes</th>
                  <th className="text-left p-2">Receita</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {producers.map((producer) => (
                  <tr key={producer.id} className="border-b">
                    <td className="p-2">{producer.name}</td>
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
                    <td className="p-2">
                      <Dialog open={isDialogOpen && selectedProducer?.id === producer.id} onOpenChange={(open) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedProducer(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedProducer(producer)}
                          >
                            Adicionar Cliente
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Adicionar Cliente para {producer.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Nome</Label>
                              <Input
                                id="name"
                                value={newClientData.name}
                                onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={newClientData.email}
                                onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="password">Senha</Label>
                              <Input
                                id="password"
                                type="password"
                                value={newClientData.password}
                                onChange={(e) => setNewClientData({ ...newClientData, password: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cpf">CPF</Label>
                              <Input
                                id="cpf"
                                value={newClientData.cpf}
                                onChange={(e) => setNewClientData({ ...newClientData, cpf: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Telefone</Label>
                              <Input
                                id="phone"
                                value={newClientData.phone}
                                onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                              />
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={() => handleAddClient(producer.id)}
                            >
                              Adicionar Cliente
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </td>
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
          <div className="ml-auto">
            <Dialog open={isAddProducerDialogOpen} onOpenChange={setIsAddProducerDialogOpen}>
              <DialogTrigger asChild>
                <Button>Adicionar Produtor</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Produtor</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="producer-email">Email</Label>
                    <Input
                      id="producer-email"
                      type="email"
                      value={newProducerData.email}
                      onChange={(e) => setNewProducerData({ ...newProducerData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="producer-password">Senha Inicial</Label>
                    <Input
                      id="producer-password"
                      type="password"
                      value={newProducerData.password}
                      onChange={(e) => setNewProducerData({ ...newProducerData, password: e.target.value })}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={handleAddProducer}
                  >
                    Adicionar Produtor
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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

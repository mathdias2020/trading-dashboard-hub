
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { OverviewCards } from "@/components/admin/dashboard/OverviewCards";
import { ProducersList } from "@/components/admin/dashboard/ProducersList";
import { ProducersManagement } from "@/components/admin/dashboard/ProducersManagement";
import { NotificationsView } from "@/components/admin/dashboard/NotificationsView";
import { Producer, Client, Notification, NewClientData } from "@/types/admin";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "notifications">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddProducerDialogOpen, setIsAddProducerDialogOpen] = useState(false);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [newClientData, setNewClientData] = useState<NewClientData>({
    name: "",
    email: "",
    password: "",
    mt5Account: "",
    mt5Password: "",
    maxContracts: 1
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

  const handleAddClient = async () => {
    try {
      if (!selectedProducer) return;

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newClientData.email,
        password: newClientData.password,
        options: {
          data: {
            role: 'client',
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create MT5 account
        const { error: mt5Error } = await supabase
          .from('mt5_accounts')
          .insert([{
            user_id: authData.user.id,
            account_number: newClientData.mt5Account,
            mt5_password: newClientData.mt5Password,
          }]);

        if (mt5Error) throw mt5Error;

        // Create producer-client relationship
        const { error: relationError } = await supabase
          .from('producer_clients')
          .insert([{
            producer_id: selectedProducer.id,
            client_id: authData.user.id,
            max_contracts: newClientData.maxContracts,
          }]);

        if (relationError) throw relationError;

        toast({
          title: "Cliente adicionado",
          description: "O cliente foi vinculado ao produtor com sucesso",
        });

        setIsAddClientDialogOpen(false);
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

        <OverviewCards producers={producers} />
        
        <ProducersList
          producers={producers}
          selectedProducer={selectedProducer}
          isDialogOpen={isDialogOpen}
          newClientData={newClientData}
          onSelectProducer={handleSelectProducer}
          onAddClient={handleAddClient}
          onNewClientDataChange={setNewClientData}
          onDialogOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setSelectedProducer(null);
          }}
        />
      </div>
    );
  }

  if (currentView === "producers") {
    return (
      <ProducersManagement
        producers={producers}
        clients={clients}
        selectedProducer={selectedProducer}
        isAddProducerDialogOpen={isAddProducerDialogOpen}
        isAddClientDialogOpen={isAddClientDialogOpen}
        newProducerData={newProducerData}
        newClientData={newClientData}
        onBack={() => {
          setCurrentView("overview");
          setSelectedProducer(null);
        }}
        onSelectProducer={handleSelectProducer}
        onAddProducer={handleAddProducer}
        onAddClient={handleAddClient}
        onAddProducerDialogOpenChange={setIsAddProducerDialogOpen}
        onAddClientDialogOpenChange={setIsAddClientDialogOpen}
        onNewProducerDataChange={setNewProducerData}
        onNewClientDataChange={setNewClientData}
      />
    );
  }

  if (currentView === "notifications") {
    return (
      <NotificationsView
        notifications={notifications}
        onBack={() => setCurrentView("overview")}
        onResolveNotification={handleResolveNotification}
      />
    );
  }

  return null;
};

export default AdminDashboard;

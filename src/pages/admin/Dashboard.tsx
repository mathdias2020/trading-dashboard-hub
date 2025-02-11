
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProducers } from "@/hooks/use-producers";
import { useNotifications } from "@/hooks/use-notifications";
import Overview from "@/components/admin/Overview";
import ProducersView from "@/components/admin/ProducersView";
import NotificationsView from "@/components/admin/NotificationsView";
import AddProducerDialog from "@/components/admin/AddProducerDialog";
import ProducerTable from "@/components/admin/ProducerTable";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import { mockClients } from "@/mock/clientData";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "notifications">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isAddProducerOpen, setIsAddProducerOpen] = useState(false);
  const [newProducer, setNewProducer] = useState({
    name: "",
    email: "",
    initialPassword: "",
  });

  const [clients, setClients] = useState<Client[]>(mockClients);

  const { producers, addProducer } = useProducers();
  const { notifications, resolveNotification } = useNotifications();
  const { toast } = useToast();

  const handleNewProducerChange = (field: string, value: string) => {
    setNewProducer(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProducer = () => {
    if (!newProducer.name || !newProducer.email || !newProducer.initialPassword) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    addProducer(newProducer.name, newProducer.email);
    setNewProducer({ name: "", email: "", initialPassword: "" });
    setIsAddProducerOpen(false);
  };

  const handleSelectProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    toast({
      title: "Produtor selecionado",
      description: `Visualizando clientes de ${producer.name}`,
    });
  };

  const handleAddClient = (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producerId: number;
  }) => {
    const newClient: Client = {
      id: clients.length + 1,
      name: clientData.name,
      email: clientData.email,
      accountNumber: "",
      monthlyResult: 0,
      status: "Aguardando Pagamento",
      producerId: clientData.producerId,
      needsPasswordChange: true,
      subscriptionDate: new Date().toISOString(),
      contracts: 0,
      maxContracts: 5,
      algoTrading: false,
      mt5Balance: 0,
      result: 0,
    };

    setClients([...clients, newClient]);
  };

  if (currentView === "overview") {
    return (
      <div className="space-y-6">
        <Overview
          producers={producers}
          onViewProducers={() => setCurrentView("producers")}
          onViewNotifications={() => setCurrentView("notifications")}
        />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Lista de Produtores</h2>
          <AddProducerDialog
            isOpen={isAddProducerOpen}
            onOpenChange={setIsAddProducerOpen}
            newProducer={newProducer}
            onNewProducerChange={handleNewProducerChange}
            onAddProducer={handleAddProducer}
          />
        </div>

        <ProducerTable producers={producers} />
      </div>
    );
  }

  if (currentView === "producers") {
    return (
      <ProducersView
        producers={producers}
        clients={clients}
        selectedProducer={selectedProducer}
        onBack={() => {
          setCurrentView("overview");
          setSelectedProducer(null);
        }}
        onSelectProducer={handleSelectProducer}
        onAddClient={handleAddClient}
      />
    );
  }

  if (currentView === "notifications") {
    return (
      <NotificationsView
        notifications={notifications}
        onBack={() => setCurrentView("overview")}
        onResolveNotification={resolveNotification}
      />
    );
  }

  return null;
};

export default AdminDashboard;

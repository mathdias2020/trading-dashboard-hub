
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Overview from "@/components/admin/Overview";
import ProducersView from "@/components/admin/ProducersView";
import NotificationsView from "@/components/admin/NotificationsView";
import AddProducerDialog from "@/components/admin/AddProducerDialog";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import { Notification } from "@/types/notification";

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
      <ProducersView
        producers={producers}
        clients={clients}
        selectedProducer={selectedProducer}
        onBack={() => {
          setCurrentView("overview");
          setSelectedProducer(null);
        }}
        onSelectProducer={handleSelectProducer}
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

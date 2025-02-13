
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProducers } from "@/hooks/use-producers";
import { useNotifications } from "@/hooks/use-notifications";
import { useTasks } from "@/hooks/use-tasks";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProducersView from "@/components/admin/ProducersView";
import SectorsManagement from "@/components/admin/SectorsManagement";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import { mockClients } from "@/mock/clientData";
import TaskSection from "@/components/admin/dashboard/TaskSection";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "tasks" | "sectors">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isAddProducerOpen, setIsAddProducerOpen] = useState(false);
  const [newProducer, setNewProducer] = useState({
    name: "",
    email: "",
    initialPassword: "",
    producerCode: "",
  });

  const [clients, setClients] = useState<Client[]>(mockClients);

  const { producers, addProducer } = useProducers();
  const { notifications, resolveNotification } = useNotifications();
  const { tasks, taskTypes, taskSectors, addTask, addTaskType, addTaskSector } = useTasks();
  const { toast } = useToast();

  const handleNewProducerChange = (field: string, value: string) => {
    setNewProducer(prev => ({ ...prev, [field]: value }));
  };

  const handleAddProducer = () => {
    if (!newProducer.name || !newProducer.email || !newProducer.initialPassword || !newProducer.producerCode) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    addProducer(newProducer.name, newProducer.email, newProducer.producerCode);
    setNewProducer({ name: "", email: "", initialPassword: "", producerCode: "" });
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
    producer_id: string;
  }) => {
    const newClient: Client = {
      id: String(clients.length + 1), // Convert to string since IDs are strings/UUIDs
      name: clientData.name,
      email: clientData.email,
      account_number: "",
      monthly_result: 0,
      status: "Aguardando Pagamento",
      producer_id: clientData.producer_id,
      needs_password_change: true,
      subscription_date: new Date().toISOString(),
      contracts: 0,
      max_contracts: 5,
      algo_trading: false,
      mt5_balance: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setClients([...clients, newClient]);
  };

  if (currentView === "overview") {
    return (
      <DashboardContent
        producers={producers}
        isAddProducerOpen={isAddProducerOpen}
        setIsAddProducerOpen={setIsAddProducerOpen}
        newProducer={newProducer}
        onNewProducerChange={handleNewProducerChange}
        onAddProducer={handleAddProducer}
        onViewProducers={() => setCurrentView("producers")}
        onViewTasks={() => setCurrentView("tasks")}
        onViewSectors={() => setCurrentView("sectors")}
      />
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

  if (currentView === "tasks") {
    return (
      <TaskSection
        tasks={tasks}
        onBack={() => setCurrentView("overview")}
      />
    );
  }

  if (currentView === "sectors") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setCurrentView("overview")}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
        </div>

        <SectorsManagement
          taskTypes={taskTypes}
          taskSectors={taskSectors}
          onAddTaskType={addTaskType}
          onAddTaskSector={addTaskSector}
        />
      </div>
    );
  }

  return null;
};

export default AdminDashboard;

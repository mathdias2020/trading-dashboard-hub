import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProducers } from "@/hooks/use-producers";
import { useNotifications } from "@/hooks/use-notifications";
import { useTasks } from "@/hooks/use-tasks";
import Overview from "@/components/admin/Overview";
import ProducersView from "@/components/admin/ProducersView";
import SectorsManagement from "@/components/admin/SectorsManagement";
import AddProducerDialog from "@/components/admin/AddProducerDialog";
import AddTaskDialog from "@/components/admin/AddTaskDialog";
import ProducerTable from "@/components/admin/ProducerTable";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";
import { mockClients } from "@/mock/clientData";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "tasks" | "sectors">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isAddProducerOpen, setIsAddProducerOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
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
          onViewTasks={() => setCurrentView("tasks")}
          onViewSectors={() => setCurrentView("sectors")}
        />

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Lista de Produtores</h2>
          <div className="space-x-4">
            <AddTaskDialog
              isOpen={isAddTaskOpen}
              onOpenChange={setIsAddTaskOpen}
              taskTypes={taskTypes}
              taskSectors={taskSectors}
              producers={producers}
              clients={clients}
              onAddTask={addTask}
            />
            <AddProducerDialog
              isOpen={isAddProducerOpen}
              onOpenChange={setIsAddProducerOpen}
              newProducer={newProducer}
              onNewProducerChange={handleNewProducerChange}
              onAddProducer={handleAddProducer}
            />
          </div>
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

  if (currentView === "tasks") {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setCurrentView("overview")}>
            <ArrowLeft className="mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold">Tarefas</h1>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{task.type}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <p className="text-sm">Setor: {task.sector}</p>
                  {task.producerId && <p className="text-sm">Produtor: {task.producerId}</p>}
                  {task.clientId && <p className="text-sm">Cliente: {task.clientId}</p>}
                  <p className="text-sm text-muted-foreground">
                    Status: {task.status === "pending" ? "Pendente" : "Concluída"}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
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

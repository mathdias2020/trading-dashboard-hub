
import { Button } from "@/components/ui/button";
import { OverviewCards } from "@/components/admin/dashboard/OverviewCards";
import { ProducersList } from "@/components/admin/dashboard/ProducersList";
import { ProducersManagement } from "@/components/admin/dashboard/ProducersManagement";
import { NotificationsView } from "@/components/admin/dashboard/NotificationsView";
import { Notification } from "@/types/admin";
import { useAdminDashboard } from "@/hooks/admin/useAdminDashboard";

const AdminDashboard = () => {
  const {
    currentView,
    setCurrentView,
    selectedProducer,
    setSelectedProducer,
    producers,
    isDialogOpen,
    setIsDialogOpen,
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    isAddClientDialogOpen,
    setIsAddClientDialogOpen,
    newClientData,
    setNewClientData,
    newProducerData,
    setNewProducerData,
    handleAddClient,
    handleAddProducer,
    handleSelectProducer,
  } = useAdminDashboard();

  // Mock notifications data (this could be moved to another hook if needed)
  const notifications: Notification[] = [
    { id: 1, type: "producer", message: "Novo produtor aguardando aprovação", date: "2024-03-20", status: "pending" },
    { id: 2, type: "client", message: "Cliente solicitou alteração de dados bancários", date: "2024-03-19", status: "pending" },
  ];

  const handleResolveNotification = (id: number) => {
    // This could be moved to a notifications hook when implementing real notification handling
    console.log("Resolving notification:", id);
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
        clients={[]}
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

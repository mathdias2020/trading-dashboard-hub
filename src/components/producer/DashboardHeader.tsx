
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  producerName: string;
  currentView: "dashboard" | "settings" | "clients";
  onViewChange: (view: "dashboard" | "settings" | "clients") => void;
}

const DashboardHeader = ({ producerName, currentView, onViewChange }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
      <div className="flex items-center space-x-4">
        <Button 
          variant={currentView === "dashboard" ? "default" : "ghost"}
          onClick={() => onViewChange("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant={currentView === "clients" ? "default" : "ghost"}
          onClick={() => onViewChange("clients")}
        >
          Clientes
        </Button>
        <Button 
          variant={currentView === "settings" ? "default" : "ghost"}
          onClick={() => onViewChange("settings")}
        >
          Configurações
        </Button>
        <div className="text-sm text-muted-foreground">Bem-vindo, {producerName}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;

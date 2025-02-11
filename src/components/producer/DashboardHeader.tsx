
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  producerName: string;
  currentView: "dashboard" | "clients";
  onViewChange: (view: "dashboard" | "clients") => void;
}

const DashboardHeader = ({ producerName, currentView, onViewChange }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleViewChange = (view: "dashboard" | "clients") => {
    onViewChange(view);
    if (view === "clients") {
      navigate("/producer/clients");
    } else {
      navigate("/producer/dashboard");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
      <div className="flex items-center space-x-4">
        <Button 
          variant={currentView === "dashboard" ? "default" : "ghost"}
          onClick={() => handleViewChange("dashboard")}
        >
          Dashboard
        </Button>
        <Button 
          variant={currentView === "clients" ? "default" : "ghost"}
          onClick={() => handleViewChange("clients")}
        >
          Clientes
        </Button>
        <div className="text-sm text-muted-foreground">Bem-vindo, {producerName}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;


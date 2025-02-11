
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import TermsOfUseDialog from "@/components/auth/TermsOfUseDialog";

const ProducerSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    mt5Account: "",
    mt5Password: "",
    maxContracts: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    setShowTerms(true);
  };

  const handleAcceptTerms = () => {
    // Here we would typically update the password and producer details
    toast({
      title: "Configuração concluída",
      description: "Suas informações foram atualizadas com sucesso",
    });

    navigate("/producer/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Configuração Inicial</h1>
        <p className="text-center text-muted-foreground">
          Por favor, altere sua senha e complete suas informações para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nova Senha</label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirmar Nova Senha</label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Conta MT5</label>
            <Input
              value={formData.mt5Account}
              onChange={(e) => setFormData({ ...formData, mt5Account: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Senha MT5</label>
            <Input
              type="password"
              value={formData.mt5Password}
              onChange={(e) => setFormData({ ...formData, mt5Password: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Número Máximo de Contratos</label>
            <Input
              type="number"
              value={formData.maxContracts}
              onChange={(e) => setFormData({ ...formData, maxContracts: e.target.value })}
              required
              min="1"
            />
          </div>

          <Button type="submit" className="w-full">
            Concluir Configuração
          </Button>
        </form>
      </Card>

      <TermsOfUseDialog 
        isOpen={showTerms}
        onAccept={handleAcceptTerms}
        termsText="Texto das políticas de uso..."
      />
    </div>
  );
};

export default ProducerSetup;

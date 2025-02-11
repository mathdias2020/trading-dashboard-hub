
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddClientDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddClient: (clientData: {
    name: string;
    email: string;
    initialPassword: string;
    producerId: number;
  }) => void;
  producerId: number;
}

const AddClientDialog = ({
  isOpen,
  onOpenChange,
  onAddClient,
  producerId,
}: AddClientDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    initialPassword: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.initialPassword) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onAddClient({
      ...formData,
      producerId,
    });

    setFormData({
      name: "",
      email: "",
      initialPassword: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Cliente
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Cliente</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Nome</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nome completo"
            />
          </div>
          <div className="space-y-2">
            <label>Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <label>Senha Inicial</label>
            <Input
              type="password"
              value={formData.initialPassword}
              onChange={(e) => setFormData({ ...formData, initialPassword: e.target.value })}
              placeholder="Senha inicial"
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Adicionar Cliente
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;


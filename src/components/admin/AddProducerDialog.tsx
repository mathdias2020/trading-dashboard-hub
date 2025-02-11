
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

interface AddProducerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newProducer: {
    name: string;
    email: string;
    initialPassword: string;
    producerCode: string;
  };
  onNewProducerChange: (field: string, value: string) => void;
  onAddProducer: () => void;
}

const AddProducerDialog = ({
  isOpen,
  onOpenChange,
  newProducer,
  onNewProducerChange,
  onAddProducer,
}: AddProducerDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Produtor
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produtor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Nome</label>
            <Input
              value={newProducer.name}
              onChange={(e) => onNewProducerChange("name", e.target.value)}
              placeholder="Nome completo"
            />
          </div>
          <div className="space-y-2">
            <label>Email</label>
            <Input
              type="email"
              value={newProducer.email}
              onChange={(e) => onNewProducerChange("email", e.target.value)}
              placeholder="email@exemplo.com"
            />
          </div>
          <div className="space-y-2">
            <label>Código do Produtor</label>
            <Input
              value={newProducer.producerCode}
              onChange={(e) => onNewProducerChange("producerCode", e.target.value)}
              placeholder="PROD123"
            />
          </div>
          <div className="space-y-2">
            <label>Senha Inicial</label>
            <Input
              type="password"
              value={newProducer.initialPassword}
              onChange={(e) => onNewProducerChange("initialPassword", e.target.value)}
              placeholder="Senha inicial"
            />
          </div>
          <Button onClick={onAddProducer} className="w-full">
            Adicionar Produtor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProducerDialog;

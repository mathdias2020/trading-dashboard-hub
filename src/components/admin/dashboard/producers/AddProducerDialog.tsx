
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddProducerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  producerData: {
    email: string;
    password: string;
  };
  onProducerDataChange: (data: any) => void;
  onAddProducer: () => void;
}

export const AddProducerDialog = ({
  isOpen,
  onOpenChange,
  producerData,
  onProducerDataChange,
  onAddProducer,
}: AddProducerDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Adicionar Produtor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produtor</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="producer-email">Email</Label>
            <Input
              id="producer-email"
              type="email"
              value={producerData.email}
              onChange={(e) => onProducerDataChange({ ...producerData, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="producer-password">Senha Inicial</Label>
            <Input
              id="producer-password"
              type="password"
              value={producerData.password}
              onChange={(e) => onProducerDataChange({ ...producerData, password: e.target.value })}
            />
          </div>
          <Button 
            className="w-full" 
            onClick={onAddProducer}
          >
            Adicionar Produtor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

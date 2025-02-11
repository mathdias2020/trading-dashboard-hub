
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { TaskType, TaskSector } from "@/types/task";
import { Producer } from "@/types/producer";
import { Client } from "@/types/client";

interface AddTaskDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  taskTypes: TaskType[];
  taskSectors: TaskSector[];
  producers: Producer[];
  clients: Client[];
  onAddTask: (task: {
    type: string;
    sector: string;
    producerId?: number;
    clientId?: number;
    description: string;
  }) => void;
}

const AddTaskDialog = ({
  isOpen,
  onOpenChange,
  taskTypes,
  taskSectors,
  producers,
  clients,
  onAddTask,
}: AddTaskDialogProps) => {
  const [formData, setFormData] = useState({
    type: "",
    sector: "",
    producerId: "",
    clientId: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!formData.type || !formData.sector || !formData.description) {
      toast({
        title: "Erro",
        description: "Tipo, setor e descrição são obrigatórios",
        variant: "destructive",
      });
      return;
    }

    onAddTask({
      type: formData.type,
      sector: formData.sector,
      producerId: formData.producerId ? Number(formData.producerId) : undefined,
      clientId: formData.clientId ? Number(formData.clientId) : undefined,
      description: formData.description,
    });

    setFormData({
      type: "",
      sector: "",
      producerId: "",
      clientId: "",
      description: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Tarefa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>Tipo de Tarefa</label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type.id} value={type.name}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Setor Responsável</label>
            <Select
              value={formData.sector}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, sector: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o setor" />
              </SelectTrigger>
              <SelectContent>
                {taskSectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Produtor (Opcional)</label>
            <Select
              value={formData.producerId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, producerId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o produtor" />
              </SelectTrigger>
              <SelectContent>
                {producers.map((producer) => (
                  <SelectItem key={producer.id} value={String(producer.id)}>
                    {producer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Cliente (Opcional)</label>
            <Select
              value={formData.clientId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, clientId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {clients.map((client) => (
                  <SelectItem key={client.id} value={String(client.id)}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label>Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="Descreva a tarefa..."
            />
          </div>
          <Button onClick={handleSubmit} className="w-full">
            Adicionar Tarefa
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;

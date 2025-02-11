
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { TaskType, TaskSector } from "@/types/task";

interface SectorsManagementProps {
  taskTypes: TaskType[];
  taskSectors: TaskSector[];
  onAddTaskType: (name: string) => void;
  onAddTaskSector: (name: string) => void;
}

const SectorsManagement = ({
  taskTypes,
  taskSectors,
  onAddTaskType,
  onAddTaskSector,
}: SectorsManagementProps) => {
  const [newTaskType, setNewTaskType] = useState("");
  const [newTaskSector, setNewTaskSector] = useState("");

  const handleAddTaskType = () => {
    if (newTaskType.trim()) {
      onAddTaskType(newTaskType.trim());
      setNewTaskType("");
    }
  };

  const handleAddTaskSector = () => {
    if (newTaskSector.trim()) {
      onAddTaskSector(newTaskSector.trim());
      setNewTaskSector("");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gerenciamento de Setores</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-4">
          <h3 className="text-xl font-semibold">Tipos de Tarefa</h3>
          <div className="flex gap-2">
            <Input
              value={newTaskType}
              onChange={(e) => setNewTaskType(e.target.value)}
              placeholder="Novo tipo de tarefa"
            />
            <Button onClick={handleAddTaskType}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {taskTypes.map((type) => (
              <Card key={type.id} className="p-2">
                {type.name}
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-4 space-y-4">
          <h3 className="text-xl font-semibold">Setores</h3>
          <div className="flex gap-2">
            <Input
              value={newTaskSector}
              onChange={(e) => setNewTaskSector(e.target.value)}
              placeholder="Novo setor"
            />
            <Button onClick={handleAddTaskSector}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {taskSectors.map((sector) => (
              <Card key={sector.id} className="p-2">
                {sector.name}
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SectorsManagement;


import { useState } from "react";
import { TaskSector } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

export const useTaskSectors = () => {
  const [taskSectors, setTaskSectors] = useState<TaskSector[]>([
    { id: 1, name: "Suporte Técnico" },
    { id: 2, name: "Suporte Produtor" },
    { id: 3, name: "Suporte Cliente" },
  ]);

  const { toast } = useToast();

  const addTaskSector = (name: string) => {
    const newTaskSector: TaskSector = {
      id: taskSectors.length + 1,
      name,
    };
    setTaskSectors([...taskSectors, newTaskSector]);
    toast({
      title: "Setor adicionado",
      description: "O novo setor foi criado com sucesso",
    });
  };

  return { taskSectors, addTaskSector };
};

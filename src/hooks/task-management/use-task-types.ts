
import { useState } from "react";
import { TaskType } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

export const useTaskTypes = () => {
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([
    { id: 1, name: "Configuração MT5" },
    { id: 2, name: "Suporte Cliente" },
    { id: 3, name: "Problema Técnico" },
  ]);

  const { toast } = useToast();

  const addTaskType = (name: string) => {
    const newTaskType: TaskType = {
      id: taskTypes.length + 1,
      name,
    };
    setTaskTypes([...taskTypes, newTaskType]);
    toast({
      title: "Tipo de tarefa adicionado",
      description: "O novo tipo de tarefa foi criado com sucesso",
    });
  };

  return { taskTypes, addTaskType };
};


import { useState } from "react";
import { Task, TaskType, TaskSector } from "@/types/task";
import { useToast } from "@/hooks/use-toast";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskTypes, setTaskTypes] = useState<TaskType[]>([
    { id: 1, name: "Configuração MT5" },
    { id: 2, name: "Suporte Cliente" },
    { id: 3, name: "Problema Técnico" },
  ]);
  const [taskSectors, setTaskSectors] = useState<TaskSector[]>([
    { id: 1, name: "Suporte Técnico" },
    { id: 2, name: "Suporte Produtor" },
    { id: 3, name: "Suporte Cliente" },
  ]);
  const { toast } = useToast();

  const addTask = (task: Omit<Task, "id" | "status" | "createdAt">) => {
    const newTask: Task = {
      id: tasks.length + 1,
      ...task,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    toast({
      title: "Tarefa adicionada",
      description: "A tarefa foi criada com sucesso",
    });
  };

  const completeTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              completedAt: new Date().toISOString(),
            }
          : task
      )
    );
    toast({
      title: "Tarefa concluída",
      description: "A tarefa foi marcada como concluída",
    });
  };

  const addTaskType = (name: string) => {
    const newType: TaskType = {
      id: taskTypes.length + 1,
      name,
    };
    setTaskTypes([...taskTypes, newType]);
    toast({
      title: "Tipo de tarefa adicionado",
      description: `${name} foi adicionado como tipo de tarefa`,
    });
  };

  const addTaskSector = (name: string) => {
    const newSector: TaskSector = {
      id: taskSectors.length + 1,
      name,
    };
    setTaskSectors([...taskSectors, newSector]);
    toast({
      title: "Setor adicionado",
      description: `${name} foi adicionado como setor`,
    });
  };

  return {
    tasks,
    taskTypes,
    taskSectors,
    addTask,
    completeTask,
    addTaskType,
    addTaskSector,
  };
};

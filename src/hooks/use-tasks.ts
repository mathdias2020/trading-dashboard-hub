
import { useState } from "react";
import { Task, TaskType, TaskSector, MT5Error } from "@/types/task";
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

  const [mt5Errors] = useState<MT5Error[]>([
    { id: 1, code: "ERR_001", description: "Email não autorizado pelo produtor" },
    { id: 2, code: "ERR_002", description: "Conta MT5 não encontrada" },
    { id: 3, code: "ERR_003", description: "Configuração inválida" },
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

  const addMT5Error = (taskId: number, errorId: number) => {
    const error = mt5Errors.find((err) => err.id === errorId);
    if (!error) return;

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "error",
              mt5Error: error,
            }
          : task
      )
    );
    toast({
      title: "Erro registrado",
      description: "O erro foi registrado e o cliente foi notificado",
    });
  };

  const markTaskAsResolved = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "client_resolution",
              mt5Error: undefined,
            }
          : task
      )
    );
    toast({
      title: "Resolução registrada",
      description: "A tarefa voltou para verificação do suporte",
    });
  };

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

  return {
    tasks,
    taskTypes,
    taskSectors,
    mt5Errors,
    addTask,
    completeTask,
    addMT5Error,
    markTaskAsResolved,
    addTaskType,
    addTaskSector,
  };
};

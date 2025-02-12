
import { useState } from "react";
import { Task, MT5Error } from "@/types/task";
import { useToast } from "@/hooks/use-toast";
import { useTaskTypes } from "./task-management/use-task-types";
import { useTaskSectors } from "./task-management/use-task-sectors";
import { useMT5Errors } from "./task-management/use-mt5-errors";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { taskTypes, addTaskType } = useTaskTypes();
  const { taskSectors, addTaskSector } = useTaskSectors();
  const { mt5Errors } = useMT5Errors();
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

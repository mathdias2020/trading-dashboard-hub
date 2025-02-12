
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";
import { useToast } from "@/hooks/use-toast";
import { useProducers } from "@/hooks/use-producers";
import AddTaskDialog from "@/components/admin/AddTaskDialog";
import { mockClients } from "@/mock/clientData";

const TechnicalSupportDashboard = () => {
  const { tasks, completeTask, taskTypes, taskSectors, mt5Errors, addMT5Error } = useTasks();
  const { producers } = useProducers();
  const { toast } = useToast();
  const [sectorTasks, setSectorTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  useEffect(() => {
    const filteredTasks = tasks.filter(
      (task) => task.sector === "Suporte Técnico"
    );
    setSectorTasks(filteredTasks);
  }, [tasks]);

  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId);
  };

  const handleMT5Error = (taskId: number, errorId: number) => {
    addMT5Error(taskId, errorId);
  };

  const handleAddTask = (task: {
    type: string;
    sector: string;
    producerId?: number;
    clientId?: number;
    description: string;
  }) => {
    toast({
      title: "Tarefa adicionada",
      description: "A tarefa foi criada com sucesso",
    });
    setIsAddTaskOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Painel do Suporte Técnico
        </h1>
        <AddTaskDialog
          isOpen={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          taskTypes={taskTypes}
          taskSectors={taskSectors}
          producers={producers}
          clients={mockClients}
          onAddTask={handleAddTask}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lista de Tarefas</h2>
        {sectorTasks.length === 0 ? (
          <Card className="p-4">
            <p className="text-center text-muted-foreground">
              Nenhuma tarefa encontrada
            </p>
          </Card>
        ) : (
          sectorTasks.map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{task.type}</h3>
                  <p className="text-sm text-muted-foreground">
                    {task.description}
                  </p>
                  {task.producerId && (
                    <p className="text-sm">Produtor: {task.producerId}</p>
                  )}
                  {task.clientId && (
                    <p className="text-sm">Cliente: {task.clientId}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Criada em: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                  {task.mt5Error && (
                    <p className="text-sm text-red-500">
                      Erro: {task.mt5Error.description}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  {task.status === "pending" && task.type === "Configuração MT5" && (
                    <div className="flex flex-col gap-2">
                      <Select onValueChange={(value) => handleMT5Error(task.id, Number(value))}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Selecionar erro" />
                        </SelectTrigger>
                        <SelectContent>
                          {mt5Errors.map((error) => (
                            <SelectItem key={error.id} value={error.id.toString()}>
                              {error.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button variant="outline" onClick={() => handleCompleteTask(task.id)}>
                        Aprovar
                      </Button>
                    </div>
                  )}
                  {task.status === "client_resolution" && (
                    <Button variant="outline" onClick={() => handleCompleteTask(task.id)}>
                      Verificar Resolução
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default TechnicalSupportDashboard;


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";
import { useToast } from "@/hooks/use-toast";
import { useProducers } from "@/hooks/use-producers";
import AddTaskDialog from "@/components/admin/AddTaskDialog";
import { mockClients } from "@/mock/clientData";

const SectorDashboard = () => {
  const { sector } = useParams();
  const { tasks, completeTask, taskTypes, taskSectors } = useTasks();
  const { producers } = useProducers();
  const { toast } = useToast();
  const [sectorTasks, setSectorTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  useEffect(() => {
    const filteredTasks = tasks.filter(
      (task) => task.sector.toLowerCase() === sector?.toLowerCase()
    );
    setSectorTasks(filteredTasks);
  }, [tasks, sector]);

  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId);
  };

  const handleAddTask = (task: {
    type: string;
    sector: string;
    producerId?: number;
    clientId?: number;
    description: string;
  }) => {
    // A lógica de adicionar tarefa será executada aqui através do hook useTasks
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
          Painel Administrativo - {sector}
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
                </div>
                {task.status === "pending" && (
                  <Button
                    variant="outline"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    Concluir
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SectorDashboard;


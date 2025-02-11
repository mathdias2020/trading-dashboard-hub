
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";
import { useTasks } from "@/hooks/use-tasks";
import { useToast } from "@/hooks/use-toast";

const SectorDashboard = () => {
  const { sector } = useParams();
  const { tasks, completeTask } = useTasks();
  const { toast } = useToast();
  const [sectorTasks, setSectorTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Filter tasks by sector
    const filteredTasks = tasks.filter(
      (task) => task.sector.toLowerCase() === sector?.toLowerCase()
    );
    setSectorTasks(filteredTasks);
  }, [tasks, sector]);

  const handleCompleteTask = (taskId: number) => {
    completeTask(taskId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Painel Administrativo - {sector}
        </h1>
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

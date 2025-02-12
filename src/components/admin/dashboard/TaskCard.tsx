
import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{task.type}</h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
          <p className="text-sm">Setor: {task.sector}</p>
          {task.producerId && <p className="text-sm">Produtor: {task.producerId}</p>}
          {task.clientId && <p className="text-sm">Cliente: {task.clientId}</p>}
          <p className="text-sm text-muted-foreground">
            Status: {task.status === "pending" ? "Pendente" : "Concluída"}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;

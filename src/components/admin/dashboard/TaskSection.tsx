
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Task } from "@/types/task";

interface TaskSectionProps {
  tasks: Task[];
  onBack: () => void;
}

const TaskSection = ({ tasks, onBack }: TaskSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Tarefas</h1>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="p-4">
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
        ))}
      </div>
    </div>
  );
};

export default TaskSection;

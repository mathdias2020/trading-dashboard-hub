
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Task } from "@/types/task";
import TaskCard from "./TaskCard";

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
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskSection;


import Overview from "@/components/admin/Overview";
import ProducerTable from "@/components/admin/ProducerTable";
import { Producer } from "@/types/producer";
import AddTaskDialog from "@/components/admin/AddTaskDialog";
import AddProducerDialog from "@/components/admin/AddProducerDialog";

interface DashboardContentProps {
  producers: Producer[];
  isAddTaskOpen: boolean;
  setIsAddTaskOpen: (open: boolean) => void;
  isAddProducerOpen: boolean;
  setIsAddProducerOpen: (open: boolean) => void;
  newProducer: {
    name: string;
    email: string;
    initialPassword: string;
    producerCode: string;
  };
  onNewProducerChange: (field: string, value: string) => void;
  onAddProducer: () => void;
  onViewProducers: () => void;
  onViewTasks: () => void;
  onViewSectors: () => void;
}

const DashboardContent = ({
  producers,
  isAddTaskOpen,
  setIsAddTaskOpen,
  isAddProducerOpen,
  setIsAddProducerOpen,
  newProducer,
  onNewProducerChange,
  onAddProducer,
  onViewProducers,
  onViewTasks,
  onViewSectors,
}: DashboardContentProps) => {
  return (
    <div className="space-y-6">
      <Overview
        producers={producers}
        onViewProducers={onViewProducers}
        onViewTasks={onViewTasks}
        onViewSectors={onViewSectors}
      />

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Lista de Produtores</h2>
        <div className="space-x-4">
          <AddTaskDialog
            isOpen={isAddTaskOpen}
            onOpenChange={setIsAddTaskOpen}
            taskTypes={[]}
            taskSectors={[]}
            producers={producers}
            clients={[]}
            onAddTask={() => {}}
          />
          <AddProducerDialog
            isOpen={isAddProducerOpen}
            onOpenChange={setIsAddProducerOpen}
            newProducer={newProducer}
            onNewProducerChange={onNewProducerChange}
            onAddProducer={onAddProducer}
          />
        </div>
      </div>

      <ProducerTable producers={producers} />
    </div>
  );
};

export default DashboardContent;

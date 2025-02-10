
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";
import { Producer } from "@/types/admin";
import { EditProducerDialog } from "./EditProducerDialog";
import { useState } from "react";

interface ProducerListProps {
  producers: Producer[];
  selectedProducer: Producer | null;
  onSelectProducer: (producer: Producer) => void;
  onEditProducer: (producer: Producer, data: any) => void;
}

export const ProducerList = ({
  producers,
  selectedProducer,
  onSelectProducer,
  onEditProducer,
}: ProducerListProps) => {
  const [editingProducer, setEditingProducer] = useState<Producer | null>(null);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
      <div className="space-y-2">
        {producers.map((producer) => (
          <div key={producer.id} className="flex items-center gap-2">
            <Button
              variant={selectedProducer?.id === producer.id ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => onSelectProducer(producer)}
            >
              {producer.name}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setEditingProducer(producer)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      {editingProducer && (
        <EditProducerDialog
          isOpen={!!editingProducer}
          onOpenChange={(open) => !open && setEditingProducer(null)}
          producer={editingProducer}
          onEditProducer={(data) => {
            onEditProducer(editingProducer, data);
            setEditingProducer(null);
          }}
        />
      )}
    </Card>
  );
};


import { Producer } from "@/types/producer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProducersListProps {
  producers: Producer[];
  selectedProducer: Producer | null;
  onSelectProducer: (producer: Producer) => void;
}

const ProducersList = ({ producers, selectedProducer, onSelectProducer }: ProducersListProps) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
      <div className="space-y-2">
        {producers.map((producer) => (
          <Button
            key={producer.id}
            variant={selectedProducer?.id === producer.id ? "default" : "outline"}
            className="w-full justify-start"
            onClick={() => onSelectProducer(producer)}
          >
            {producer.name}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default ProducersList;

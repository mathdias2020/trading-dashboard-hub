
import { useState } from "react";
import { Producer } from "@/types/producer";
import { useToast } from "@/hooks/use-toast";

export const useProducers = () => {
  const [producers, setProducers] = useState<Producer[]>([
    { id: 1, name: "João Silva", status: "Ativo", clients: 15, revenue: 25000, email: "joao@example.com", producerCode: "PROD001" },
    { id: 2, name: "Maria Santos", status: "Pendente", clients: 8, revenue: 12000, email: "maria@example.com", producerCode: "PROD002" },
    { id: 3, name: "Pedro Oliveira", status: "Inativo", clients: 0, revenue: 0, email: "pedro@example.com", producerCode: "PROD003" },
  ]);
  const { toast } = useToast();

  const addProducer = (name: string, email: string, producerCode: string) => {
    const newId = producers.length + 1;
    const producerToAdd: Producer = {
      id: newId,
      name,
      email,
      producerCode,
      status: "Pendente",
      clients: 0,
      revenue: 0,
    };

    setProducers([...producers, producerToAdd]);
    toast({
      title: "Produtor adicionado",
      description: `${name} foi adicionado como produtor`,
    });
  };

  return {
    producers,
    addProducer,
  };
};

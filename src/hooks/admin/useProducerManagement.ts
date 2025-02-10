
import { useState } from "react";
import { Producer } from "@/types/admin";
import { useFetchProducers } from "./producers/useFetchProducers";
import { useAddProducer } from "./producers/useAddProducer";
import { useEditProducer } from "./producers/useEditProducer";
import { useToast } from "@/hooks/use-toast";

export const useProducerManagement = () => {
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const { toast } = useToast();
  
  const { producers, fetchProducers } = useFetchProducers();
  const { 
    isAddProducerDialogOpen, 
    setIsAddProducerDialogOpen, 
    newProducerData, 
    setNewProducerData, 
    handleAddProducer 
  } = useAddProducer(fetchProducers);
  const { handleEditProducer } = useEditProducer(fetchProducers);

  const handleSelectProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    toast({
      title: "Produtor selecionado",
      description: `Visualizando clientes de ${producer.name}`,
    });
  };

  return {
    producers,
    selectedProducer,
    setSelectedProducer,
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    newProducerData,
    setNewProducerData,
    handleAddProducer,
    handleEditProducer,
    handleSelectProducer,
    fetchProducers,
  };
};


import { useState, useEffect } from "react";
import { useProducerManagement } from "./useProducerManagement";
import { useClientManagement } from "./useClientManagement";
import { Producer } from "@/types/admin";

export const useAdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "notifications">("overview");
  
  const {
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
  } = useProducerManagement();

  const {
    isAddClientDialogOpen,
    setIsAddClientDialogOpen,
    isDialogOpen,
    setIsDialogOpen,
    newClientData,
    setNewClientData,
    handleAddClient: baseHandleAddClient,
  } = useClientManagement();

  const handleAddClient = async () => {
    if (selectedProducer) {
      await baseHandleAddClient(selectedProducer.id);
      fetchProducers();
    }
  };

  useEffect(() => {
    fetchProducers();
  }, []);

  return {
    currentView,
    setCurrentView,
    selectedProducer,
    setSelectedProducer,
    producers,
    isDialogOpen,
    setIsDialogOpen,
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    isAddClientDialogOpen,
    setIsAddClientDialogOpen,
    newClientData,
    setNewClientData,
    newProducerData,
    setNewProducerData,
    handleAddClient,
    handleAddProducer,
    handleSelectProducer,
    handleEditProducer,
  };
};

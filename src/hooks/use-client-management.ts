
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Client } from "@/types/client";

export const useClientManagement = (initialClients: Client[]) => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const { toast } = useToast();

  const toggleClientStatus = (clientId: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const newStatus = client.status === "Ativo" ? "Inativo" : "Ativo";
        toast({
          title: "Status alterado",
          description: `Status do cliente ${client.name} alterado para ${newStatus}`,
        });
        return { ...client, status: newStatus };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const updateClientContracts = (clientId: number, maxContracts: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        toast({
          title: "Contratos atualizados",
          description: `Limite de contratos do cliente ${client.name} atualizado para ${maxContracts}`,
        });
        return { ...client, maxContracts };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const toggleAlgoTrading = (clientId: number) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        const newAlgoTrading = !client.algoTrading;
        toast({
          title: "AlgoTrading alterado",
          description: `AlgoTrading do cliente ${client.name} ${newAlgoTrading ? 'ativado' : 'desativado'}`,
        });
        return { ...client, algoTrading: newAlgoTrading };
      }
      return client;
    });
    setClients(updatedClients);
  };

  return {
    clients,
    setClients,
    toggleClientStatus,
    updateClientContracts,
    toggleAlgoTrading,
  };
};

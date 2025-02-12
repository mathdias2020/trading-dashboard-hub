
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Client } from "@/types/client";
import { useQuery } from "@tanstack/react-query";

export const useClientManagement = (producerId?: string) => {
  const { toast } = useToast();

  const { data: clients = [], refetch } = useQuery({
    queryKey: ["managed-clients", producerId],
    queryFn: async () => {
      if (!producerId) return [];

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("producer_id", producerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching clients:", error);
        throw error;
      }

      return data as Client[];
    },
    enabled: !!producerId
  });

  const toggleClientStatus = async (clientId: string) => {
    try {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      const newStatus = client.status === "active" ? "inactive" : "active";

      const { error } = await supabase
        .from("clients")
        .update({ status: newStatus })
        .eq("id", clientId);

      if (error) throw error;

      toast({
        title: "Status alterado",
        description: `Status do cliente ${client.name} alterado para ${newStatus}`,
      });

      refetch();
    } catch (error) {
      console.error("Error toggling client status:", error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do cliente",
        variant: "destructive",
      });
    }
  };

  const updateClientContracts = async (clientId: string, maxContracts: number) => {
    try {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      const { error } = await supabase
        .from("clients")
        .update({ max_contracts: maxContracts })
        .eq("id", clientId);

      if (error) throw error;

      toast({
        title: "Contratos atualizados",
        description: `Limite de contratos do cliente ${client.name} atualizado para ${maxContracts}`,
      });

      refetch();
    } catch (error) {
      console.error("Error updating client contracts:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o limite de contratos",
        variant: "destructive",
      });
    }
  };

  const toggleAlgoTrading = async (clientId: string) => {
    try {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      const { error } = await supabase
        .from("clients")
        .update({ algo_trading: !client.algo_trading })
        .eq("id", clientId);

      if (error) throw error;

      toast({
        title: "AlgoTrading alterado",
        description: `AlgoTrading do cliente ${client.name} ${!client.algo_trading ? 'ativado' : 'desativado'}`,
      });

      refetch();
    } catch (error) {
      console.error("Error toggling algo trading:", error);
      toast({
        title: "Erro",
        description: "Não foi possível alterar o status do AlgoTrading",
        variant: "destructive",
      });
    }
  };

  const updateAccountInfo = async (clientId: string, accountData: { mt5_account: string; mt5_password: string }) => {
    try {
      const client = clients.find(c => c.id === clientId);
      if (!client) return;

      const { error } = await supabase
        .from("clients")
        .update({
          ...accountData,
          status: "under_review"
        })
        .eq("id", clientId);

      if (error) throw error;

      toast({
        title: "Informações da conta atualizadas",
        description: "Suas informações foram enviadas para revisão",
      });

      refetch();
    } catch (error) {
      console.error("Error updating account info:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar as informações da conta",
        variant: "destructive",
      });
    }
  };

  return {
    clients,
    toggleClientStatus,
    updateClientContracts,
    toggleAlgoTrading,
    updateAccountInfo,
  };
};

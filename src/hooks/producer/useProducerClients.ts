
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type ProducerClientResponse = {
  id: string;
  max_contracts: number;
  status: string;
  client_id: string;
  clients: {
    id: string;
    profiles!fk_clients_profile: {
      name: string;
    }[];
    mt5_accounts: {
      account_number: string;
      balance: number;
      algo_trading: boolean;
    }[];
  } | null;
}

export const useProducerClients = () => {
  const { toast } = useToast();

  const { data: clients, refetch: refetchClients } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const { data: producerClients, error } = await supabase
        .from('producer_clients')
        .select(`
          id,
          max_contracts,
          status,
          client_id,
          clients!producer_clients_client_id_fkey (
            id,
            profiles!fk_clients_profile (
              name
            ),
            mt5_accounts (
              account_number,
              balance,
              algo_trading
            )
          )
        `)
        .eq('producer_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      return (producerClients as ProducerClientResponse[]).map(pc => ({
        id: pc.id,
        name: pc.clients?.profiles!fk_clients_profile?.[0]?.name || 'Sem nome',
        account: pc.clients?.mt5_accounts?.[0]?.account_number || 'N/A',
        monthlyResult: 0, // Será implementado com trading_results
        status: pc.status || 'Inativo',
        maxContracts: pc.max_contracts || 1,
        algoTrading: pc.clients?.mt5_accounts?.[0]?.algo_trading || false,
        mt5Balance: pc.clients?.mt5_accounts?.[0]?.balance || 0,
      }));
    }
  });

  const handleStatusChange = async (clientId: string) => {
    try {
      const currentClient = clients?.find(c => c.id === clientId);
      const newStatus = currentClient?.status === 'Ativo' ? 'Inativo' : 'Ativo';

      const { error } = await supabase
        .from('producer_clients')
        .update({
          status: newStatus
        })
        .eq('id', clientId);

      if (error) throw error;

      toast({
        title: "Status atualizado",
        description: "O status do cliente foi atualizado com sucesso.",
      });

      refetchClients();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o status do cliente.",
        variant: "destructive"
      });
    }
  };

  const handleMaxContractsChange = async (clientId: string, value: string) => {
    try {
      const { error } = await supabase
        .from('producer_clients')
        .update({
          max_contracts: parseInt(value)
        })
        .eq('id', clientId);

      if (error) throw error;

      toast({
        title: "Limite atualizado",
        description: "O limite de contratos foi atualizado com sucesso.",
      });

      refetchClients();
    } catch (error) {
      console.error('Erro ao atualizar limite de contratos:', error);
      toast({
        title: "Erro",
        description: "Ocorrer um erro ao atualizar o limite de contratos.",
        variant: "destructive"
      });
    }
  };

  return {
    clients,
    handleStatusChange,
    handleMaxContractsChange,
    subscribersBalance: clients?.reduce((total, client) => total + client.mt5Balance, 0) || 0,
    activeClientsCount: clients?.filter(c => c.status === "Ativo").length || 0
  };
};

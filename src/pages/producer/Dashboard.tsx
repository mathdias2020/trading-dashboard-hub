
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import StatsCards from "@/components/producer/dashboard/StatsCards";
import ClientsTable from "@/components/producer/dashboard/ClientsTable";
import ClientSettings from "@/components/producer/dashboard/ClientSettings";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");
  const [currentView, setCurrentView] = useState<"dashboard" | "settings">("dashboard");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const { toast } = useToast();

  // Fetch producer profile
  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();
      
      if (error) throw error;
      return profile;
    }
  });

  // Fetch MT5 account info
  const { data: mt5Account } = useQuery({
    queryKey: ['mt5Account'],
    queryFn: async () => {
      const { data: account, error } = await supabase
        .from('mt5_accounts')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .maybeSingle();
      
      if (error) throw error;
      return account;
    }
  });

  // Fetch clients
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
          clients (
            id
          ),
          profiles!clients(id, name),
          mt5_accounts(account_number, balance, algo_trading)
        `)
        .eq('producer_id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      return producerClients.map(pc => ({
        id: pc.id,
        name: pc.profiles?.name || 'Sem nome',
        account: pc.mt5_accounts?.[0]?.account_number || 'N/A',
        monthlyResult: 0, // Será implementado com trading_results
        status: pc.status || 'Inativo',
        maxContracts: pc.max_contracts || 1,
        algoTrading: pc.mt5_accounts?.[0]?.algo_trading || false,
        mt5Balance: pc.mt5_accounts?.[0]?.balance || 0,
      }));
    }
  });

  // Fetch trading results for capital curve
  const { data: tradingResults } = useQuery({
    queryKey: ['tradingResults', date],
    queryFn: async () => {
      const { data: results, error } = await supabase
        .from('trading_results')
        .select('*')
        .eq('producer_id', (await supabase.auth.getUser()).data.user?.id)
        .gte('date', date?.from?.toISOString() || new Date().toISOString())
        .lte('date', date?.to?.toISOString() || new Date().toISOString())
        .order('date', { ascending: true });

      if (error) throw error;
      return results;
    },
    enabled: !!date?.from && !!date?.to
  });

  const handleStatusChange = async (clientId: number) => {
    try {
      const { error } = await supabase
        .from('producer_clients')
        .update({
          status: clients?.find(c => c.id === clientId)?.status === 'Ativo' ? 'Inativo' : 'Ativo'
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

  const handleMaxContractsChange = async (clientId: number, value: string) => {
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
        description: "Ocorreu um erro ao atualizar o limite de contratos.",
        variant: "destructive"
      });
    }
  };

  const capitalCurveData = tradingResults?.map(result => ({
    date: result.date,
    value: result.result
  })) || [];

  const producerData = {
    name: profile?.name || "Carregando...",
    status: "Ativo",
    mt5Account: mt5Account?.account_number || "N/A",
    personalBalance: mt5Account?.balance || 0,
    subscribersBalance: clients?.reduce((total, client) => total + client.mt5Balance, 0) || 0,
    monthlyRevenue: 0, // Será implementado posteriormente
  };

  const activeClientsCount = clients?.filter(c => c.status === "Ativo").length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
        <div className="flex items-center space-x-4">
          <Button 
            variant={currentView === "dashboard" ? "default" : "ghost"}
            onClick={() => setCurrentView("dashboard")}
          >
            Dashboard
          </Button>
          <Button 
            variant={currentView === "settings" ? "default" : "ghost"}
            onClick={() => setCurrentView("settings")}
          >
            Configurações
          </Button>
          <div className="text-sm text-muted-foreground">Bem-vindo, {producerData.name}</div>
        </div>
      </div>

      {currentView === "dashboard" ? (
        <>
          <StatsCards
            balanceView={balanceView}
            setBalanceView={setBalanceView}
            producerData={producerData}
            activeClientsCount={activeClientsCount}
          />
          <div className="mt-8 mb-6">
            <CapitalCurveChart 
              data={capitalCurveData}
            />
          </div>
          <ClientsTable
            clients={clients || []}
            date={date}
            setDate={setDate}
          />
        </>
      ) : (
        <ClientSettings
          clients={clients || []}
          onStatusChange={handleStatusChange}
          onMaxContractsChange={handleMaxContractsChange}
        />
      )}
    </div>
  );
};

export default ProducerDashboard;

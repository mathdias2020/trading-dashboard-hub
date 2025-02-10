
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useProducerData = () => {
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

  return {
    profile,
    mt5Account,
    producerData: {
      name: profile?.name || "Carregando...",
      status: "Ativo",
      mt5Account: mt5Account?.account_number || "N/A",
      personalBalance: mt5Account?.balance || 0,
      monthlyRevenue: 0, // Será implementado posteriormente
    }
  };
};

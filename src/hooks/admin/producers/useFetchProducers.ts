
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Producer } from "@/types/admin";

export const useFetchProducers = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const { toast } = useToast();

  const fetchProducers = async () => {
    try {
      const { data: producersData, error: producersError } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          email,
          cpf,
          role,
          producers (
            document_verified,
            business_info,
            partnership_model,
            monthly_fee_per_client
          ),
          producer_clients!producer_id (
            count
          )
        `)
        .eq('role', 'producer');

      if (producersError) {
        console.error('Error fetching producers:', producersError);
        throw producersError;
      }

      const formattedProducers = producersData.map(producer => ({
        id: producer.id,
        name: producer.name || 'Sem nome',
        email: producer.email,
        cpf: producer.cpf,
        role: producer.role,
        status: producer.producers?.document_verified ? "Ativo" : "Pendente",
        clients: producer.producer_clients?.[0]?.count || 0,
        revenue: 0, // This could be calculated from trading_results if needed
        document_verified: producer.producers?.document_verified || false,
        partnership_model: producer.producers?.partnership_model || "nomos",
        monthly_fee_per_client: producer.producers?.monthly_fee_per_client || 100
      }));

      setProducers(formattedProducers);
    } catch (error) {
      console.error('Error in fetchProducers:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os produtores",
      });
    }
  };

  return {
    producers,
    fetchProducers,
  };
};

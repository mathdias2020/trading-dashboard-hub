
import { useQuery } from "@tanstack/react-query";
import { Producer } from "@/types/producer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useProducers = () => {
  const { toast } = useToast();

  const { data: producers = [], refetch } = useQuery({
    queryKey: ["producers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("producers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching producers:", error);
        throw error;
      }

      return data as Producer[];
    }
  });

  const addProducer = async (name: string, email: string, producerCode: string) => {
    try {
      const { error } = await supabase
        .from("producers")
        .insert([
          {
            name,
            email,
            producer_code: producerCode,
            status: "pending"
          }
        ]);

      if (error) throw error;

      toast({
        title: "Produtor adicionado",
        description: `${name} foi adicionado como produtor`,
      });

      refetch();
    } catch (error) {
      console.error("Error adding producer:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produtor",
        variant: "destructive",
      });
    }
  };

  return {
    producers,
    addProducer,
  };
};

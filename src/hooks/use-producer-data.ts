
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Producer } from "@/types/producer";

export const useProducerData = (producerId?: string) => {
  return useQuery({
    queryKey: ["producer", producerId],
    queryFn: async () => {
      if (!producerId) throw new Error("No producer ID provided");
      
      const { data: producer, error } = await supabase
        .from("producers")
        .select("*")
        .eq("id", producerId)
        .single();

      if (error) {
        console.error("Error fetching producer:", error);
        throw error;
      }

      return producer as Producer;
    },
    enabled: !!producerId
  });
};

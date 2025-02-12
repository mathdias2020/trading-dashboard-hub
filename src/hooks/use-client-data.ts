
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Client } from "@/types/client";

export const useClientData = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data: clients, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching clients:", error);
        throw error;
      }

      return clients as Client[];
    }
  });
};

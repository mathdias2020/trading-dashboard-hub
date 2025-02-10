
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { NewClientData } from "@/types/admin";

export const useClientManagement = () => {
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newClientData, setNewClientData] = useState<NewClientData>({
    name: "",
    email: "",
    password: "",
    mt5Account: "",
    mt5Password: "",
    maxContracts: 1
  });
  const { toast } = useToast();

  const handleAddClient = async (producerId: string) => {
    try {
      // Create new user with email signup
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newClientData.email,
        password: newClientData.password,
        options: {
          data: {
            name: newClientData.name,
            role: 'client',
          },
          emailRedirectTo: `${window.location.origin}/client/dashboard`
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create MT5 account entry
        const { error: mt5Error } = await supabase
          .from('mt5_accounts')
          .insert([{
            user_id: authData.user.id,
            account_number: newClientData.mt5Account,
            mt5_password: newClientData.mt5Password,
          }]);

        if (mt5Error) throw mt5Error;

        // Create producer-client relationship
        const { error: relationError } = await supabase
          .from('producer_clients')
          .insert([{
            producer_id: producerId,
            client_id: authData.user.id,
            max_contracts: newClientData.maxContracts,
          }]);

        if (relationError) throw relationError;

        toast({
          title: "Cliente adicionado",
          description: "O cliente foi vinculado ao produtor com sucesso",
        });

        setIsAddClientDialogOpen(false);
        
        // Reset form data
        setNewClientData({
          name: "",
          email: "",
          password: "",
          mt5Account: "",
          mt5Password: "",
          maxContracts: 1
        });
      }
    } catch (error: any) {
      console.error('Error adding client:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: error.message || "Não foi possível adicionar o cliente",
      });
    }
  };

  return {
    isAddClientDialogOpen,
    setIsAddClientDialogOpen,
    isDialogOpen,
    setIsDialogOpen,
    newClientData,
    setNewClientData,
    handleAddClient,
  };
};

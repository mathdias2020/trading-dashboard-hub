
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { supabaseAdmin } from "@/integrations/supabase/adminClient";

export const useAddProducer = (onSuccess: () => void) => {
  const [isAddProducerDialogOpen, setIsAddProducerDialogOpen] = useState(false);
  const [newProducerData, setNewProducerData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleAddProducer = async (data: { email: string; password: string }) => {
    console.log("Starting producer creation with data:", data);
    try {
      const { data: userData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email: data.email.trim(),
        password: data.password,
        email_confirm: true,
        user_metadata: {
          role: 'producer',
        }
      });

      if (createUserError) {
        console.error('Error creating producer:', createUserError);
        toast({
          variant: "destructive",
          title: "Erro",
          description: createUserError.message || "Não foi possível adicionar o produtor",
        });
        return;
      }

      if (userData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            role: 'producer',
            email: data.email.trim()
          })
          .eq('id', userData.user.id);

        if (profileError) {
          console.error('Error updating profile:', profileError);
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Erro ao atualizar o perfil do produtor",
          });
          return;
        }

        const { error: producerError } = await supabase
          .from('producers')
          .insert([{ id: userData.user.id }]);

        if (producerError) {
          console.error('Error creating producer record:', producerError);
          toast({
            variant: "destructive",
            title: "Erro",
            description: "Erro ao criar registro do produtor",
          });
          return;
        }

        toast({
          title: "Produtor adicionado",
          description: "O produtor foi adicionado com sucesso.",
        });

        setIsAddProducerDialogOpen(false);
        setNewProducerData({ email: "", password: "" });
        onSuccess();
      }
    } catch (error) {
      console.error('Error in handleAddProducer:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar o produtor",
      });
    }
  };

  return {
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    newProducerData,
    setNewProducerData,
    handleAddProducer,
  };
};

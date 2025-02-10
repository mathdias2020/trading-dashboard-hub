
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Producer } from "@/types/admin";

export const useEditProducer = (onSuccess: () => void) => {
  const { toast } = useToast();

  const handleEditProducer = async (producer: Producer, data: any) => {
    if (!producer || !data) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Dados do produtor inválidos",
      });
      return;
    }

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: data.name,
          email: data.email,
          cpf: data.cpf,
        })
        .eq('id', producer.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        throw profileError;
      }

      const { error: producerError } = await supabase
        .from('producers')
        .update({
          partnership_model: data.partnership_model,
        })
        .eq('id', producer.id);

      if (producerError) {
        console.error('Error updating producer:', producerError);
        throw producerError;
      }

      toast({
        title: "Produtor atualizado",
        description: "As informações do produtor foram atualizadas com sucesso",
      });

      onSuccess();
    } catch (error) {
      console.error('Error in handleEditProducer:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o produtor",
      });
    }
  };

  return {
    handleEditProducer,
  };
};

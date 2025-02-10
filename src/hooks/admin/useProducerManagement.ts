
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { supabaseAdmin } from "@/integrations/supabase/adminClient";
import { Producer } from "@/types/admin";

export const useProducerManagement = () => {
  const [producers, setProducers] = useState<Producer[]>([]);
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [isAddProducerDialogOpen, setIsAddProducerDialogOpen] = useState(false);
  const [newProducerData, setNewProducerData] = useState({
    email: "",
    password: "",
  });
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
          producers!inner (
            document_verified,
            business_info,
            partnership_model,
            monthly_fee_per_client
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
        status: producer.producers?.document_verified ? "Ativo" : "Pendente",
        clients: 0,
        revenue: 0,
        document_verified: producer.producers?.document_verified || false,
        partnership_model: producer.producers?.partnership_model || "nomos",
        monthly_fee_per_client: producer.producers?.monthly_fee_per_client || 100
      }));

      setProducers(formattedProducers);

      // Fetch client count for each producer
      for (const producer of formattedProducers) {
        const { count, error: countError } = await supabase
          .from('producer_clients')
          .select('*', { count: 'exact' })
          .eq('producer_id', producer.id);

        if (countError) {
          console.error('Error fetching client count:', countError);
          continue;
        }

        producer.clients = count || 0;
      }

      setProducers([...formattedProducers]);
    } catch (error) {
      console.error('Error in fetchProducers:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os produtores",
      });
    }
  };

  const handleAddProducer = async (data: { email: string; password: string }) => {
    console.log("Starting producer creation with data:", data);
    try {
      // Create user with admin client to skip email verification
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
        // Update the profiles table
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

        // Insert into producers table
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
        await fetchProducers();
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

  const handleEditProducer = async (producer: Producer, data: any) => {
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

      fetchProducers();
    } catch (error) {
      console.error('Error in handleEditProducer:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o produtor",
      });
    }
  };

  const handleSelectProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    toast({
      title: "Produtor selecionado",
      description: `Visualizando clientes de ${producer.name}`,
    });
  };

  return {
    producers,
    selectedProducer,
    setSelectedProducer,
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    newProducerData,
    setNewProducerData,
    handleAddProducer,
    handleEditProducer,
    handleSelectProducer,
    fetchProducers,
  };
};


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

      if (producersError) throw producersError;

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

      for (const producer of formattedProducers) {
        const { count } = await supabase
          .from('producer_clients')
          .select('*', { count: 'exact' })
          .eq('producer_id', producer.id);

        producer.clients = count || 0;
      }

      setProducers([...formattedProducers]);
    } catch (error) {
      console.error('Error fetching producers:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível carregar os produtores",
      });
    }
  };

  const handleAddProducer = async () => {
    try {
      // Validate required fields
      if (!newProducerData.email || !newProducerData.password) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Email e senha são obrigatórios",
        });
        return;
      }

      // Validate email format
      if (!newProducerData.email.includes('@')) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Por favor insira um email válido",
        });
        return;
      }

      // Create user with admin client to skip email verification
      const { data: userData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
        email: newProducerData.email.trim(),
        password: newProducerData.password,
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
        toast({
          title: "Produtor adicionado",
          description: "O produtor foi adicionado com sucesso.",
        });

        setIsAddProducerDialogOpen(false);
        setNewProducerData({ email: "", password: "" }); // Reset form
        fetchProducers();
      }
    } catch (error) {
      console.error('Error adding producer:', error);
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

      if (profileError) throw profileError;

      const { error: producerError } = await supabase
        .from('producers')
        .update({
          partnership_model: data.partnership_model,
        })
        .eq('id', producer.id);

      if (producerError) throw producerError;

      toast({
        title: "Produtor atualizado",
        description: "As informações do produtor foram atualizadas com sucesso",
      });

      fetchProducers();
    } catch (error) {
      console.error('Error updating producer:', error);
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

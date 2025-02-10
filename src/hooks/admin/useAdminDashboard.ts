
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Producer, NewClientData } from "@/types/admin";

export const useAdminDashboard = () => {
  const [currentView, setCurrentView] = useState<"overview" | "producers" | "notifications">("overview");
  const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null);
  const [producers, setProducers] = useState<Producer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddProducerDialogOpen, setIsAddProducerDialogOpen] = useState(false);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [newClientData, setNewClientData] = useState<NewClientData>({
    name: "",
    email: "",
    password: "",
    mt5Account: "",
    mt5Password: "",
    maxContracts: 1
  });
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
          producers!inner (
            document_verified,
            business_info
          )
        `)
        .eq('role', 'producer');

      if (producersError) throw producersError;

      const formattedProducers = producersData.map(producer => ({
        id: producer.id,
        name: producer.name || 'Sem nome',
        status: producer.producers?.document_verified ? "Ativo" : "Pendente",
        clients: 0,
        revenue: 0,
        document_verified: producer.producers?.document_verified || false
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

  const handleAddClient = async () => {
    try {
      if (!selectedProducer) return;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newClientData.email,
        password: newClientData.password,
        options: {
          data: {
            role: 'client',
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: mt5Error } = await supabase
          .from('mt5_accounts')
          .insert([{
            user_id: authData.user.id,
            account_number: newClientData.mt5Account,
            mt5_password: newClientData.mt5Password,
          }]);

        if (mt5Error) throw mt5Error;

        const { error: relationError } = await supabase
          .from('producer_clients')
          .insert([{
            producer_id: selectedProducer.id,
            client_id: authData.user.id,
            max_contracts: newClientData.maxContracts,
          }]);

        if (relationError) throw relationError;

        toast({
          title: "Cliente adicionado",
          description: "O cliente foi vinculado ao produtor com sucesso",
        });

        setIsAddClientDialogOpen(false);
        fetchProducers();
      }
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível adicionar o cliente",
      });
    }
  };

  const handleAddProducer = async () => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newProducerData.email,
        password: newProducerData.password,
        options: {
          data: {
            role: 'producer',
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        toast({
          title: "Produtor adicionado",
          description: "O produtor foi adicionado com sucesso. Ele poderá completar seu cadastro no primeiro acesso.",
        });

        setIsAddProducerDialogOpen(false);
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

  const handleSelectProducer = (producer: Producer) => {
    setSelectedProducer(producer);
    toast({
      title: "Produtor selecionado",
      description: `Visualizando clientes de ${producer.name}`,
    });
  };

  useEffect(() => {
    fetchProducers();
  }, []);

  return {
    currentView,
    setCurrentView,
    selectedProducer,
    setSelectedProducer,
    producers,
    isDialogOpen,
    setIsDialogOpen,
    isAddProducerDialogOpen,
    setIsAddProducerDialogOpen,
    isAddClientDialogOpen,
    setIsAddClientDialogOpen,
    newClientData,
    setNewClientData,
    newProducerData,
    setNewProducerData,
    handleAddClient,
    handleAddProducer,
    handleSelectProducer,
  };
};

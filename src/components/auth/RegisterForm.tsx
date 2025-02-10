
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FormField } from "./FormField";

export const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As senhas não coincidem",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: 'client',
            cpf: formData.cpf,
            phone: formData.phone,
          },
        },
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erro ao criar conta",
          description: error.message,
        });
        return;
      }

      if (data.user) {
        toast({
          title: "Conta criada com sucesso!",
          description: "Você será redirecionado para o dashboard.",
        });

        setTimeout(() => {
          navigate("/client/dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Ocorreu um erro inesperado",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        id="name"
        label="Nome completo"
        value={formData.name}
        onChange={updateFormData("name")}
        required
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={updateFormData("email")}
        required
      />
      <FormField
        id="cpf"
        label="CPF"
        value={formData.cpf}
        onChange={updateFormData("cpf")}
        required
      />
      <FormField
        id="phone"
        label="Telefone"
        value={formData.phone}
        onChange={updateFormData("phone")}
        required
      />
      <FormField
        id="password"
        label="Senha"
        type="password"
        value={formData.password}
        onChange={updateFormData("password")}
        required
      />
      <FormField
        id="confirmPassword"
        label="Confirmar senha"
        type="password"
        value={formData.confirmPassword}
        onChange={updateFormData("confirmPassword")}
        required
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Registrar"}
      </Button>
    </form>
  );
};

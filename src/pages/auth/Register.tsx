
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<"producer" | "client" | null>(null);
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

    if (!role) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Selecione um perfil",
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
            role: role,
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

        // Redirect based on role
        setTimeout(() => {
          if (role === "producer") {
            navigate("/producer/dashboard");
          } else {
            navigate("/client/dashboard");
          }
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

  if (!role) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Escolha seu perfil</h2>
          <p className="text-muted-foreground mt-2">Como você deseja se registrar?</p>
        </div>
        <div className="grid gap-4">
          <Button onClick={() => setRole("producer")} className="h-20">
            Produtor
          </Button>
          <Button onClick={() => setRole("client")} className="h-20">
            Cliente
          </Button>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link to="/" className="text-primary hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">
          Registro - {role === "producer" ? "Produtor" : "Cliente"}
        </h2>
        <p className="text-muted-foreground mt-2">Preencha seus dados para criar sua conta</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome completo</Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input
            id="cpf"
            required
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrar"}
        </Button>
      </form>
      <div className="text-center">
        <Button
          variant="link"
          className="text-sm text-muted-foreground"
          onClick={() => setRole(null)}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};

export default Register;

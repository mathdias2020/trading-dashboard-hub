
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: authError.message,
        });
        return;
      }

      if (authData.user) {
        // Primeiro verifica se é admin e seu papel
        const { data: adminData, error: adminError } = await supabase
          .from("admins")
          .select("role")
          .eq("id", authData.user.id)
          .single();

        console.log("Auth user ID:", authData.user.id); // Debug log
        console.log("Admin data:", adminData); // Debug log
        console.log("Admin error:", adminError); // Debug log

        if (adminData) {
          toast({
            title: "Login realizado com sucesso",
            description: "Redirecionando para o painel administrativo",
          });
          navigate("/admin/dashboard");
          setIsLoading(false);
          return;
        }

        // Se não é admin, verifica se é produtor
        const { data: producerData } = await supabase
          .from("producers")
          .select("id")
          .eq("id", authData.user.id)
          .single();

        if (producerData) {
          toast({
            title: "Login realizado com sucesso",
            description: "Redirecionando para o painel do produtor",
          });
          navigate("/producer/dashboard");
          setIsLoading(false);
          return;
        }

        // Se chegou aqui, é cliente
        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o painel do cliente",
        });
        navigate("/client/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Registre-se
        </Link>
      </p>
    </form>
  );
};

export default Login;

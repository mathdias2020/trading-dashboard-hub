
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
        setIsLoading(false);
        return;
      }

      if (!authData?.user?.id) {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "Usuário não encontrado",
        });
        setIsLoading(false);
        return;
      }

      const userId = authData.user.id;
      console.log("User ID:", userId);

      // Verifica primeiro se é admin
      const { data: adminData, error: adminError } = await supabase
        .from("admins")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (adminError) {
        console.error("Erro ao verificar admin:", adminError);
      }

      if (adminData) {
        console.log("Admin encontrado:", adminData);
        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o painel administrativo",
        });
        navigate("/admin/dashboard");
        setIsLoading(false);
        return;
      }

      // Se não é admin, verifica se é produtor
      const { data: producerData, error: producerError } = await supabase
        .from("producers")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (producerError) {
        console.error("Erro ao verificar produtor:", producerError);
      }

      if (producerData) {
        console.log("Produtor encontrado:", producerData);
        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o painel do produtor",
        });
        navigate("/producer/dashboard");
        setIsLoading(false);
        return;
      }

      // Se não é admin nem produtor, verifica se é cliente
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .select("id")
        .eq("id", userId)
        .maybeSingle();

      if (clientError) {
        console.error("Erro ao verificar cliente:", clientError);
      }

      if (clientData) {
        console.log("Cliente encontrado:", clientData);
        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o painel do cliente",
        });
        navigate("/client/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "Usuário não encontrado em nenhuma categoria",
        });
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

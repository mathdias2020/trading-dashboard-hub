
import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Layout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Logout realizado com sucesso",
        description: "Você será redirecionado para a página de login",
      });

      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao fazer logout",
        description: "Tente novamente em alguns instantes",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;


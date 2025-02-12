
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Task } from "@/types/task";

interface AccountSettingsProps {
  isApprovedByAdmin: boolean;
  formData: {
    account: string;
    password: string;
  };
  setFormData: (data: { account: string; password: string }) => void;
  onSubmit?: (account: string, password: string) => void;
  pendingTask?: Task;
  onResolveError?: () => void;
}

const AccountSettings = ({ 
  isApprovedByAdmin, 
  formData, 
  setFormData, 
  onSubmit,
  pendingTask,
  onResolveError 
}: AccountSettingsProps) => {
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApprovedByAdmin) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Aguarde a aprovação do administrador para fazer alterações."
      });
      return;
    }

    if (!formData.account || !formData.password) {
      toast({
        variant: "destructive",
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos"
      });
      return;
    }

    if (onSubmit) {
      onSubmit(formData.account, formData.password);
    }

    toast({
      title: "Configurações enviadas",
      description: "Suas informações foram enviadas para aprovação"
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      {pendingTask?.mt5Error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            {pendingTask.mt5Error.description}
            <Button 
              variant="outline" 
              className="ml-4"
              onClick={onResolveError}
            >
              Resolvido
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {!isApprovedByAdmin && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
          Aguarde a aprovação do administrador para fazer alterações nas configurações.
        </div>
      )}
      
      <div>
        <label className="text-sm font-medium">Conta</label>
        <Input 
          value={formData.account} 
          onChange={(e) => setFormData({...formData, account: e.target.value})}
          className="mt-1"
          disabled={!isApprovedByAdmin || pendingTask?.status === "error"}
          required
          placeholder="Digite o número da sua conta"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Senha</label>
        <Input 
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="mt-1"
          disabled={!isApprovedByAdmin || pendingTask?.status === "error"}
          required
          placeholder="Digite sua senha"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full" 
        disabled={!isApprovedByAdmin || pendingTask?.status === "error"}
      >
        Salvar Alterações
      </Button>
    </form>
  );
};

export default AccountSettings;

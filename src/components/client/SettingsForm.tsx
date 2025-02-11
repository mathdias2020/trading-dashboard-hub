
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  account: string;
  password: string;
}

interface SettingsFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  isApprovedByAdmin: boolean;
}

const SettingsForm = ({ formData, setFormData, isApprovedByAdmin }: SettingsFormProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isApprovedByAdmin) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Aguarde a aprovação do administrador para fazer alterações."
      });
      return;
    }
    toast({
      title: "Configurações atualizadas",
      description: "Suas alterações foram salvas com sucesso"
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Configurações da Conta</h2>
      {!isApprovedByAdmin && (
        <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800">
          Aguarde a aprovação do administrador para fazer alterações nas configurações.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Conta</label>
          <Input 
            value={formData.account} 
            onChange={(e) => setFormData({...formData, account: e.target.value})}
            className="mt-1"
            disabled={!isApprovedByAdmin}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Senha</label>
          <Input 
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="mt-1"
            disabled={!isApprovedByAdmin}
          />
        </div>
        <Button type="submit" className="w-full" disabled={!isApprovedByAdmin}>
          Salvar Alterações
        </Button>
      </form>
    </Card>
  );
};

export default SettingsForm;

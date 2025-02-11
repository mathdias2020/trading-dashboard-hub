
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface TermsOfUseSettingsProps {
  termsText: string;
  onSave: (text: string) => void;
}

const TermsOfUseSettings = ({ termsText, onSave }: TermsOfUseSettingsProps) => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("terms") as string;
    
    onSave(text);
    toast({
      title: "Políticas de uso atualizadas",
      description: "As alterações foram salvas com sucesso"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium">Texto das Políticas de Uso</label>
        <Textarea
          name="terms"
          defaultValue={termsText}
          className="min-h-[400px] mt-2"
          placeholder="Digite aqui o texto das políticas de uso..."
        />
      </div>
      <Button type="submit">
        Salvar Alterações
      </Button>
    </form>
  );
};

export default TermsOfUseSettings;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";

// Simulação de banco de dados
const mockProducers = [
  { code: "PROD123", name: "João Silva" },
  { code: "PROD456", name: "Maria Oliveira" },
];

const ProducerCode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [producerCode, setProducerCode] = useState("");
  const [producer, setProducer] = useState<{ code: string; name: string } | null>(
    null
  );

  const handleSearchProducer = () => {
    const foundProducer = mockProducers.find(
      (p) => p.code.toLowerCase() === producerCode.toLowerCase()
    );

    if (foundProducer) {
      setProducer(foundProducer);
    } else {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Código do produtor não encontrado",
      });
    }
  };

  const handleConfirmProducer = () => {
    toast({
      title: "Produtor confirmado",
      description: "Você será redirecionado para o dashboard",
    });
    setTimeout(() => {
      navigate("/client/dashboard");
    }, 2000);
  };

  const handleNoCode = () => {
    navigate("/client/no-producer");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Adicionar Produtor</h2>
        <p className="text-muted-foreground mt-2">
          Digite o código do seu produtor para continuar
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="producerCode">Código do Produtor</Label>
            <div className="flex gap-2">
              <Input
                id="producerCode"
                value={producerCode}
                onChange={(e) => setProducerCode(e.target.value)}
                placeholder="Digite o código"
              />
              <Button
                type="button"
                onClick={handleSearchProducer}
                disabled={!producerCode}
              >
                Buscar
              </Button>
            </div>
          </div>

          {producer && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label>Produtor Encontrado</Label>
                <p className="text-lg font-medium">{producer.name}</p>
              </div>
              <Button
                className="w-full"
                onClick={handleConfirmProducer}
              >
                Confirmar Produtor
              </Button>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center">
        <Button
          variant="link"
          className="text-muted-foreground"
          onClick={handleNoCode}
        >
          Não sei o código do produtor
        </Button>
      </div>
    </div>
  );
};

export default ProducerCode;


import { Card } from "@/components/ui/card";
import { Producer } from "@/types/admin";

interface OverviewCardsProps {
  producers: Producer[];
}

export const OverviewCards = ({ producers }: OverviewCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="font-semibold">Produtores Ativos</h3>
        <p className="text-2xl">{producers.filter(p => p.status === "Ativo").length}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Total de Clientes</h3>
        <p className="text-2xl">{producers.reduce((acc, p) => acc + p.clients, 0)}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Receita Total</h3>
        <p className="text-2xl">R$ {producers.reduce((acc, p) => acc + p.revenue, 0).toLocaleString()}</p>
      </Card>
    </div>
  );
};

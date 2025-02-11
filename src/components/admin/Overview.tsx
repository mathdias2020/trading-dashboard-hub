
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Producer } from "@/types/producer";

interface OverviewProps {
  producers: Producer[];
  onViewProducers: () => void;
  onViewNotifications: () => void;
}

const Overview = ({ producers, onViewProducers, onViewNotifications }: OverviewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="space-x-4">
          <Button onClick={onViewProducers}>Produtores</Button>
          <Button onClick={onViewNotifications}>Avisos</Button>
          <Button variant="outline" onClick={() => window.location.href = "/admin/dev"}>
            Dev Settings
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default Overview;

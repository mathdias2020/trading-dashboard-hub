
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Producer } from "@/types/producer";

interface OverviewProps {
  producers: Producer[];
  onViewProducers: () => void;
  onViewTasks: () => void;
  onViewSectors: () => void;
}

const Overview = ({ producers, onViewProducers, onViewTasks, onViewSectors }: OverviewProps) => {
  const totalActiveProducers = producers.filter(p => p.status === "Ativo").length;
  const totalClients = producers.reduce((acc, p) => acc + p.clients_count, 0);
  const totalRevenue = producers.reduce((acc, p) => acc + p.revenue, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="space-x-4">
          <Button onClick={onViewProducers}>Produtores</Button>
          <Button onClick={onViewTasks}>Tarefas</Button>
          <Button onClick={onViewSectors}>Setores</Button>
          <Button variant="outline" onClick={() => window.location.href = "/admin/dev"}>
            Dev Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h3 className="font-semibold">Produtores Ativos</h3>
          <p className="text-2xl">{totalActiveProducers}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Total de Clientes</h3>
          <p className="text-2xl">{totalClients}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Receita Total</h3>
          <p className="text-2xl">R$ {totalRevenue.toLocaleString()}</p>
        </Card>
      </div>
    </div>
  );
};

export default Overview;


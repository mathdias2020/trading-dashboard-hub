
import { Card } from "@/components/ui/card";

interface DashboardStatsProps {
  dailyBalance: number;
  monthlyBalance: number;
  status: string;
}

const DashboardStats = ({ dailyBalance, monthlyBalance, status }: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="font-semibold">Saldo Diário</h3>
        <p className="text-2xl">R$ {dailyBalance.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Saldo Mensal</h3>
        <p className="text-2xl">R$ {monthlyBalance.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Status</h3>
        <p className="mt-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === "Ativo" ? "bg-green-100 text-green-800" : 
            status === "Aguardando Aprovação" ? "bg-yellow-100 text-yellow-800" :
            "bg-red-100 text-red-800"
          }`}>
            {status}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default DashboardStats;

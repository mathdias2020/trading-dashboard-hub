
import { Card } from "@/components/ui/card";

interface DashboardStatsProps {
  dailyBalance: number;
  balance: number;
  balanceTitle: string;
  status: string;
}

const DashboardStats = ({ dailyBalance, balance, balanceTitle, status }: DashboardStatsProps) => {
  // Ensure we have valid numbers to format
  const formatNumber = (value: number) => {
    return (value || 0).toLocaleString();
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="p-4">
        <h3 className="font-semibold">Saldo Diário</h3>
        <p className="text-2xl">R$ {formatNumber(dailyBalance)}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">{balanceTitle}</h3>
        <p className="text-2xl">R$ {formatNumber(balance)}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Status</h3>
        <p className="mt-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === "Ativo" ? "bg-green-100 text-green-800" : 
            status === "Aguardando Pagamento" ? "bg-yellow-100 text-yellow-800" :
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

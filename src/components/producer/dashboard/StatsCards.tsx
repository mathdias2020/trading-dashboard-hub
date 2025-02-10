
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatsCardsProps {
  balanceView: "personal" | "subscribers";
  setBalanceView: (view: "personal" | "subscribers") => void;
  producerData: {
    personalBalance: number;
    subscribersBalance: number;
    monthlyRevenue: number;
    status: string;
  };
  activeClientsCount: number;
}

const StatsCards = ({ balanceView, setBalanceView, producerData, activeClientsCount }: StatsCardsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4">
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold">Saldo Mensal</h3>
          <div className="flex items-center space-x-2 mb-2">
            <Button 
              variant={balanceView === "personal" ? "default" : "outline"}
              onClick={() => setBalanceView("personal")}
              size="sm"
            >
              Minha Conta
            </Button>
            <Button 
              variant={balanceView === "subscribers" ? "default" : "outline"}
              onClick={() => setBalanceView("subscribers")}
              size="sm"
            >
              Assinantes
            </Button>
          </div>
          <p className="text-2xl">
            R$ {balanceView === "personal" 
              ? producerData.personalBalance.toLocaleString()
              : producerData.subscribersBalance.toLocaleString()
            }
          </p>
        </div>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Assinantes</h3>
        <p className="text-2xl">{activeClientsCount}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Receita Mensal</h3>
        <p className="text-2xl">R$ {producerData.monthlyRevenue.toLocaleString()}</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-semibold">Status</h3>
        <p className="mt-2">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
            {producerData.status}
          </span>
        </p>
      </Card>
    </div>
  );
};

export default StatsCards;


import { Card } from "@/components/ui/card";
import CapitalCurveChart from "@/components/CapitalCurveChart";

const ProducerDashboard = () => {
  const producerData = {
    name: "João Silva",
    status: "Ativo",
    mt5Account: "12345678",
    balance: 45000,
    clients: 15,
    monthlyRevenue: 7500,
  };

  const clients = [
    { id: 1, name: "Ana Costa", status: "Ativo", subscriptionDate: "2024-01-15" },
    { id: 2, name: "Carlos Mendes", status: "Ativo", subscriptionDate: "2024-02-01" },
    { id: 3, name: "Beatriz Lima", status: "Inativo", subscriptionDate: "2024-01-10" },
  ];

  const capitalCurveData = [
    { date: "2024-02-04", value: -70 },
    { date: "2024-02-05", value: 150 },
    { date: "2024-02-06", value: 200 },
    { date: "2024-02-06", value: 180 },
    { date: "2024-02-06", value: 350 },
    { date: "2024-02-06", value: 400 },
    { date: "2024-02-07", value: 500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
        <div className="text-sm text-muted-foreground">Bem-vindo, {producerData.name}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold">Saldo Atual</h3>
          <p className="text-2xl">R$ {producerData.balance.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Assinantes</h3>
          <p className="text-2xl">{producerData.clients}</p>
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

      <CapitalCurveChart data={capitalCurveData} />

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Clientes Ativos</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Data de Assinatura</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="p-2">{client.name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="p-2">{new Date(client.subscriptionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProducerDashboard;

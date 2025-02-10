
import { Card } from "@/components/ui/card";

const ClientDashboard = () => {
  const clientData = {
    name: "Ana Costa",
    status: "Ativo",
    balance: 15000,
    producer: "João Silva",
    lastOperation: "2024-02-09",
    monthlyReturn: 1200,
  };

  const operations = [
    { id: 1, date: "2024-02-09", type: "Compra", symbol: "PETR4", result: 500 },
    { id: 2, date: "2024-02-08", type: "Venda", symbol: "VALE3", result: -200 },
    { id: 3, date: "2024-02-07", type: "Compra", symbol: "ITUB4", result: 900 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Minha Conta</h1>
        <div className="text-sm text-muted-foreground">Bem-vindo(a), {clientData.name}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <h3 className="font-semibold">Saldo Atual</h3>
          <p className="text-2xl">R$ {clientData.balance.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Retorno Mensal</h3>
          <p className="text-2xl">R$ {clientData.monthlyReturn.toLocaleString()}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Produtor</h3>
          <p className="text-lg">{clientData.producer}</p>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold">Status</h3>
          <p className="mt-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
              {clientData.status}
            </span>
          </p>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Últimas Operações</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Data</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-left p-2">Ativo</th>
                <th className="text-left p-2">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {operations.map((op) => (
                <tr key={op.id} className="border-b">
                  <td className="p-2">{new Date(op.date).toLocaleDateString()}</td>
                  <td className="p-2">{op.type}</td>
                  <td className="p-2">{op.symbol}</td>
                  <td className="p-2">
                    <span className={op.result > 0 ? "text-green-600" : "text-red-600"}>
                      R$ {op.result.toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ClientDashboard;

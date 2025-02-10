
import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  const producers = [
    { id: 1, name: "João Silva", status: "Ativo", clients: 15, revenue: 25000 },
    { id: 2, name: "Maria Santos", status: "Pendente", clients: 8, revenue: 12000 },
    { id: 3, name: "Pedro Oliveira", status: "Inativo", clients: 0, revenue: 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="text-sm text-muted-foreground">Total de produtores: {producers.length}</div>
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

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Lista de Produtores</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Clientes</th>
                <th className="text-left p-2">Receita</th>
              </tr>
            </thead>
            <tbody>
              {producers.map((producer) => (
                <tr key={producer.id} className="border-b">
                  <td className="p-2">{producer.name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      producer.status === "Ativo" ? "bg-green-100 text-green-800" :
                      producer.status === "Pendente" ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {producer.status}
                    </span>
                  </td>
                  <td className="p-2">{producer.clients}</td>
                  <td className="p-2">R$ {producer.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;

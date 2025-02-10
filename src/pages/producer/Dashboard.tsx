
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ProducerDashboard = () => {
  const [balanceView, setBalanceView] = useState<"personal" | "subscribers">("personal");

  const producerData = {
    name: "João Silva",
    status: "Ativo",
    mt5Account: "12345678",
    personalBalance: 45000,
    subscribersBalance: 75000,
    monthlyRevenue: 7500,
  };

  const clients = [
    { 
      id: 1, 
      name: "Ana Costa",
      account: "MT5-001",
      monthlyResult: 2500,
      status: "Ativo"
    },
    { 
      id: 2, 
      name: "Carlos Mendes",
      account: "MT5-002",
      monthlyResult: 1800,
      status: "Ativo"
    },
    { 
      id: 3, 
      name: "Beatriz Lima",
      account: "MT5-003",
      monthlyResult: -500,
      status: "Inativo"
    },
  ];

  const personalCapitalCurveData = [
    { date: "2024-02-04", value: -70 },
    { date: "2024-02-05", value: 150 },
    { date: "2024-02-06", value: 200 },
    { date: "2024-02-06", value: 180 },
    { date: "2024-02-06", value: 350 },
    { date: "2024-02-06", value: 400 },
    { date: "2024-02-07", value: 500 },
  ];

  const subscribersCapitalCurveData = [
    { date: "2024-02-04", value: 100 },
    { date: "2024-02-05", value: 250 },
    { date: "2024-02-06", value: 300 },
    { date: "2024-02-06", value: 280 },
    { date: "2024-02-06", value: 450 },
    { date: "2024-02-06", value: 500 },
    { date: "2024-02-07", value: 600 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard do Produtor</h1>
        <div className="flex items-center space-x-4">
          <Link to="/producer/dashboard">
            <Button variant="ghost">Dashboard</Button>
          </Link>
          <Link to="/producer/settings">
            <Button variant="ghost">Configurações</Button>
          </Link>
          <div className="text-sm text-muted-foreground">Bem-vindo, {producerData.name}</div>
        </div>
      </div>

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
          <p className="text-2xl">{clients.filter(c => c.status === "Ativo").length}</p>
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

      <CapitalCurveChart 
        data={balanceView === "personal" ? personalCapitalCurveData : subscribersCapitalCurveData} 
      />

      <Card className="p-4">
        <h2 className="text-xl font-semibold mb-4">Clientes</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Resultado Mensal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.account}</TableCell>
                  <TableCell className={client.monthlyResult >= 0 ? "text-green-600" : "text-red-600"}>
                    R$ {client.monthlyResult.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {client.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default ProducerDashboard;

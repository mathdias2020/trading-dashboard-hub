
import { Card } from "@/components/ui/card";
import { Client } from "@/types/admin";

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-sm text-muted-foreground">Conta: {client.accountNumber}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">R$ {client.monthlyResult.toLocaleString()}</p>
          <span className={`px-2 py-1 rounded-full text-xs ${
            client.status === "Ativo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}>
            {client.status}
          </span>
        </div>
      </div>
    </Card>
  );
};

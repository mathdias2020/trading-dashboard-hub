
import { Card } from "@/components/ui/card";
import { Producer } from "@/types/producer";

interface ProducerTableProps {
  producers: Producer[];
}

const ProducerTable = ({ producers }: ProducerTableProps) => {
  return (
    <Card className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Clientes</th>
              <th className="text-left p-2">Receita</th>
            </tr>
          </thead>
          <tbody>
            {producers.map((producer) => (
              <tr key={producer.id} className="border-b">
                <td className="p-2">{producer.name}</td>
                <td className="p-2">{producer.email}</td>
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
  );
};

export default ProducerTable;

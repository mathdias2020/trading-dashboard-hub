
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Trade {
  id: string;
  date: string;
  result: number;
  instrument: string;
  type: string;
  status: string;
}

interface OperationsTableProps {
  trades: Trade[];
  isLoading: boolean;
}

const OperationsTable = ({ trades, isLoading }: OperationsTableProps) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Data</th>
            <th className="text-left p-2">Instrumento</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Status</th>
            <th className="text-right p-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b">
              <td className="p-2">{format(new Date(trade.date.replace(".", "-")), "dd/MM/yyyy")}</td>
              <td className="p-2">{trade.instrument}</td>
              <td className="p-2">{trade.type}</td>
              <td className="p-2">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  trade.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}>
                  {trade.status === "completed" ? "Concluído" : "Pendente"}
                </span>
              </td>
              <td className="p-2 text-right">
                <span className={trade.result > 0 ? "text-green-600" : "text-red-600"}>
                  R$ {trade.result.toLocaleString()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OperationsTable;


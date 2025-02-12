
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Trade {
  id: string;
  date: string;
  result: number;
  accountId: number;
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
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id} className="border-b">
              <td className="p-2">{format(new Date(trade.date.replace(".", "-")), "dd/MM/yyyy")}</td>
              <td className="p-2">{trade.id}</td>
              <td className="p-2">
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

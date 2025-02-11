
import { format } from "date-fns";

interface Operation {
  id: number;
  date: string;
  type: string;
  symbol: string;
  result: number;
}

interface OperationsTableProps {
  operations: Operation[];
}

const OperationsTable = ({ operations }: OperationsTableProps) => {
  return (
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
  );
};

export default OperationsTable;

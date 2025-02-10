
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface Client {
  id: number;
  name: string;
  account: string;
  monthlyResult: number;
  status: string;
  algoTrading: boolean;
  mt5Balance: number;
}

interface ClientsTableProps {
  clients: Client[];
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

const ClientsTable = ({ clients, date, setDate }: ClientsTableProps) => {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Clientes</h2>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy", { locale: ptBR })} -{" "}
                    {format(date.to, "dd/MM/yyyy", { locale: ptBR })}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy", { locale: ptBR })
                )
              ) : (
                "Selecione um período"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Conta</TableHead>
              <TableHead>Resultado Mensal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AlgoTrading</TableHead>
              <TableHead>Saldo MT5</TableHead>
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
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    client.algoTrading ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {client.algoTrading ? "Ativo" : "Inativo"}
                  </span>
                </TableCell>
                <TableCell>R$ {client.mt5Balance.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ClientsTable;

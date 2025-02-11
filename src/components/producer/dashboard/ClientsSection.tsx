
import { DateRange } from "react-day-picker";
import ClientsTable from "@/components/producer/ClientsTable";

interface ClientsSectionProps {
  clients: Array<{
    id: number;
    name: string;
    account: string;
    monthlyResult: number;
    status: string;
    maxContracts: number;
    algoTrading: boolean;
    mt5Balance: number;
  }>;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const ClientsSection = ({
  clients,
  dateRange,
  onDateRangeChange,
}: ClientsSectionProps) => {
  return (
    <ClientsTable 
      clients={clients}
      dateRange={dateRange}
      onDateRangeChange={onDateRangeChange}
    />
  );
};

export default ClientsSection;

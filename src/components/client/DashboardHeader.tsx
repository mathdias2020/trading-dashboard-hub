
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";

interface DashboardHeaderProps {
  clientName: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}

const DashboardHeader = ({ clientName, date, setDate }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Minha Conta</h1>
      <div className="flex items-center space-x-4">
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
        <div className="text-sm text-muted-foreground">Bem-vindo(a), {clientName}</div>
      </div>
    </div>
  );
};

export default DashboardHeader;

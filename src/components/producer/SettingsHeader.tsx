
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface SettingsHeaderProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export const SettingsHeader = ({ date, onDateChange }: SettingsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/producer/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Configurações</h1>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : "Selecione uma data"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

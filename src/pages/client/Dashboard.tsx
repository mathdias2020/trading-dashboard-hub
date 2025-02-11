
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CapitalCurveChart from "@/components/CapitalCurveChart";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRange } from "react-day-picker";
import { addDays, isWithinInterval, parseISO } from "date-fns";
import DashboardStats from "@/components/client/overview/DashboardStats";
import OperationsTable from "@/components/client/overview/OperationsTable";
import AccountSettings from "@/components/client/settings/AccountSettings";

const ClientDashboard = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7)
  });
  const [formData, setFormData] = useState({
    account: "123",
    password: "1234",
  });

  const clientData = {
    name: "Ana Costa",
    status: "Aguardando Aprovação",
    producer: "João Silva",
    lastOperation: "2024-02-09",
    dailyBalance: 500,
    monthlyBalance: 1200,
    producerContractLimit: 10,
    algoTrading: true,
    mt5Balance: 15000,
    isApprovedByAdmin: false,
  };

  const operations = [
    { id: 1, date: "2024-02-09", type: "Compra", symbol: "PETR4", result: 500 },
    { id: 2, date: "2024-02-08", type: "Venda", symbol: "VALE3", result: -200 },
    { id: 3, date: "2024-02-07", type: "Compra", symbol: "ITUB4", result: 900 },
  ];

  const capitalCurveData = [
    { date: "2024-02-04", value: -50 },
    { date: "2024-02-05", value: 100 },
    { date: "2024-02-06", value: 150 },
    { date: "2024-02-06", value: 120 },
    { date: "2024-02-06", value: 280 },
    { date: "2024-02-06", value: 320 },
    { date: "2024-02-07", value: 400 },
  ];

  const getFilteredCapitalData = () => {
    if (!date?.from || !date?.to) return capitalCurveData;
    
    return capitalCurveData.filter((item) => {
      const itemDate = parseISO(item.date);
      return isWithinInterval(itemDate, { 
        start: date.from, 
        end: date.to 
      });
    });
  };

  return (
    <div className="space-y-6">
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
          <div className="text-sm text-muted-foreground">Bem-vindo(a), {clientData.name}</div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardStats 
            dailyBalance={clientData.dailyBalance}
            monthlyBalance={clientData.monthlyBalance}
            status={clientData.status}
          />

          <div className="mt-8 mb-6">
            <CapitalCurveChart data={getFilteredCapitalData()} />
          </div>

          <Card className="p-4">
            <h2 className="text-xl font-semibold mb-4">Últimas Operações</h2>
            <OperationsTable operations={operations} />
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Configurações da Conta</h2>
            <AccountSettings 
              isApprovedByAdmin={clientData.isApprovedByAdmin}
              formData={formData}
              setFormData={setFormData}
            />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDashboard;

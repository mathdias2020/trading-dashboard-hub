
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Client, Producer, NewClientData } from "@/types/admin";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const clientFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  mt5Account: z.string().min(1, "Conta MT5 é obrigatória"),
  mt5Password: z.string().min(1, "Senha MT5 é obrigatória"),
  maxContracts: z.number().min(1, "Mínimo de 1 contrato"),
});

type ClientFormValues = z.infer<typeof clientFormSchema>;

interface ClientsListProps {
  selectedProducer: Producer;
  clients: Client[];
  isAddClientDialogOpen: boolean;
  newClientData: NewClientData;
  onAddClientDialogOpenChange: (open: boolean) => void;
  onNewClientDataChange: (data: NewClientData) => void;
  onAddClient: () => void;
}

export const ClientsList = ({
  selectedProducer,
  clients,
  isAddClientDialogOpen,
  newClientData,
  onAddClientDialogOpenChange,
  onNewClientDataChange,
  onAddClient,
}: ClientsListProps) => {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      mt5Account: "",
      mt5Password: "",
      maxContracts: 1,
    },
  });

  const onSubmit = (data: ClientFormValues) => {
    // Since ClientFormValues already matches the structure of NewClientData
    // and the Zod schema ensures all fields are present,
    // we can safely pass the data
    onNewClientDataChange({
      name: data.name,
      email: data.email,
      password: data.password,
      mt5Account: data.mt5Account,
      mt5Password: data.mt5Password,
      maxContracts: data.maxContracts
    });
    onAddClient();
    form.reset();
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Clientes de {selectedProducer.name}</h2>
        <Dialog open={isAddClientDialogOpen} onOpenChange={onAddClientDialogOpenChange}>
          <DialogTrigger asChild>
            <Button>Adicionar Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Cliente</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha Inicial</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mt5Account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conta MT5</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mt5Password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha MT5</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxContracts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contratos</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Adicionar Cliente
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {clients
          .filter(client => client.producerId === selectedProducer.id)
          .map(client => (
            <Card key={client.id} className="p-4">
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
          ))}
      </div>
    </Card>
  );
};


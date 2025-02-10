
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { NewClientData } from "@/types/admin";
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

interface AddClientFormProps {
  onSubmit: (data: NewClientData) => void;
}

export const AddClientForm = ({ onSubmit }: AddClientFormProps) => {
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

  const handleSubmit = (data: ClientFormValues) => {
    // Since ClientFormValues matches NewClientData structure exactly, we can safely pass it
    onSubmit({
      name: data.name,
      email: data.email,
      password: data.password,
      mt5Account: data.mt5Account,
      mt5Password: data.mt5Password,
      maxContracts: data.maxContracts,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
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
  );
};


import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const producerFormSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type ProducerFormValues = z.infer<typeof producerFormSchema>;

interface AddProducerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddProducer: (data: ProducerFormValues) => void;
}

export const AddProducerDialog = ({
  isOpen,
  onOpenChange,
  onAddProducer,
}: AddProducerDialogProps) => {
  const form = useForm<ProducerFormValues>({
    resolver: zodResolver(producerFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ProducerFormValues) => {
    console.log("Form submitted with data:", data); // Debug log
    await onAddProducer(data);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Adicionar Produtor</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produtor</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
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
                    <Input type="password" placeholder="Mínimo 6 caracteres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Adicionar Produtor
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

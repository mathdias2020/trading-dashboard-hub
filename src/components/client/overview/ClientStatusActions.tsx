
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ClientStatusActionsProps {
  status: string;
  accountConfigured: boolean;
  paymentReceived: boolean;
  paymentPending: boolean;
  onPayment: () => void;
  onConfigureAccount: () => void;
}

const ClientStatusActions = ({
  status,
  accountConfigured,
  paymentReceived,
  paymentPending,
  onPayment,
  onConfigureAccount,
}: ClientStatusActionsProps) => {
  if (status === "Em revisão") {
    return (
      <div className="flex justify-center">
        <Button variant="outline" className="w-fit" disabled>
          Informações em revisão
        </Button>
      </div>
    );
  }

  if (!accountConfigured && paymentReceived) {
    return (
      <div className="flex justify-center">
        <Button variant="outline" className="w-fit" onClick={onConfigureAccount}>
          Adicione as informações da conta
        </Button>
      </div>
    );
  }

  if (paymentPending && !paymentReceived) {
    return (
      <div className="flex justify-center">
        <Button onClick={onPayment} className="w-fit">
          Pagar mensalidade
        </Button>
      </div>
    );
  }

  return null;
};

export default ClientStatusActions;

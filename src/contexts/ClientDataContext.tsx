
import { createContext, useContext, ReactNode } from 'react';

interface ClientData {
  name: string;
  status: string;
  producer: string;
  lastOperation: string;
  producerContractLimit: number;
  algoTrading: boolean;
  mt5Balance: number;
  isApprovedByAdmin: boolean;
  paymentPending: boolean;
  paymentReceived: boolean;
  accountConfigured: boolean;
}

const defaultClientData: ClientData = {
  name: "Ana Costa",
  status: "Aguardando Pagamento",
  producer: "João Silva",
  lastOperation: "2024-02-09",
  producerContractLimit: 10,
  algoTrading: true,
  mt5Balance: 15000,
  isApprovedByAdmin: true,
  paymentPending: true,
  paymentReceived: false,
  accountConfigured: false,
};

const ClientDataContext = createContext<ClientData>(defaultClientData);

export const useClientData = () => useContext(ClientDataContext);

export const ClientDataProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ClientDataContext.Provider value={defaultClientData}>
      {children}
    </ClientDataContext.Provider>
  );
};

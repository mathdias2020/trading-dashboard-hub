
export type Client = {
  id: number;
  name: string;
  accountNumber: string;
  monthlyResult: number;
  status: string;
  producerId: number;
  email?: string;
  mt5Account?: string;
  mt5Password?: string;
  contracts?: number;
  maxContracts?: number;
  algoTrading?: boolean;
  producerCode?: string;
  needsPasswordChange?: boolean;
  subscriptionDate?: string;
  mt5Balance?: number;
  result?: number;
};


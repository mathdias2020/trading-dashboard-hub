
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
  producerCode?: string;
  needsPasswordChange?: boolean;
};


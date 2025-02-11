
export type Producer = {
  id: number;
  name: string;
  status: string;
  clients: number;
  revenue: number;
  email?: string;
  producerCode?: string;
  needsPasswordChange?: boolean;
  needsMT5Setup?: boolean;
};

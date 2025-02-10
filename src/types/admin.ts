
export type Producer = {
  id: string;
  name: string;
  status: string;
  clients: number;
  revenue: number;
  document_verified: boolean;
};

export type Client = {
  id: string;
  name: string;
  accountNumber: string;
  monthlyResult: number;
  status: string;
  producerId: string;
};

export type Notification = {
  id: number;
  type: "producer" | "client";
  message: string;
  date: string;
  status: "pending" | "resolved";
};

export type NewClientData = {
  name: string;
  email: string;
  password: string;
  mt5Account: string;
  mt5Password: string;
  maxContracts: number;
};


export type UserRole = 'admin' | 'producer' | 'client';

export type Producer = {
  id: string;
  name: string;
  email?: string;
  cpf?: string;
  role: UserRole;
  status: string;
  clients: number;
  revenue: number;
  document_verified: boolean;
  partnership_model: "nomos" | "independent";
  monthly_fee_per_client?: number;
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

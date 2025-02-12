
export type TaskType = {
  id: number;
  name: string;
};

export type TaskSector = {
  id: number;
  name: string;
};

export type MT5Error = {
  id: number;
  code: string;
  description: string;
};

export type Task = {
  id: number;
  type: string;
  sector: string;
  producerId?: number;
  clientId?: number;
  description: string;
  status: "pending" | "completed" | "error" | "client_resolution";
  mt5Error?: MT5Error;
  createdAt: string;
  completedAt?: string;
};


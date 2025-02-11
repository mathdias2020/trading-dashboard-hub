
export type TaskType = {
  id: number;
  name: string;
};

export type TaskSector = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  type: string;
  sector: string;
  producerId?: number;
  clientId?: number;
  description: string;
  status: "pending" | "completed";
  createdAt: string;
  completedAt?: string;
};

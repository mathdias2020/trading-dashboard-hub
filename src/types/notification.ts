
export type Notification = {
  id: number;
  type: "producer" | "client";
  message: string;
  date: string;
  status: "pending" | "resolved";
};

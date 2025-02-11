
import { useState } from "react";
import { Notification } from "@/types/notification";
import { useToast } from "@/hooks/use-toast";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, type: "producer", message: "Novo produtor aguardando aprovação: Maria Santos", date: "2024-03-20", status: "pending" },
    { id: 2, type: "client", message: "Cliente solicitou alteração de dados bancários", date: "2024-03-19", status: "pending" },
  ]);
  const { toast } = useToast();

  const resolveNotification = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, status: "resolved" }
          : notification
      )
    );
    toast({
      title: "Notificação resolvida",
      description: "A notificação foi marcada como resolvida",
    });
  };

  const addLimitChangeNotification = (clientName: string, producerName: string) => {
    const newNotification: Notification = {
      id: notifications.length + 1,
      type: "client",
      message: `Produtor ${producerName} solicitou alteração de limites para cliente ${clientName}`,
      date: new Date().toISOString().split('T')[0],
      status: "pending"
    };
    setNotifications([...notifications, newNotification]);
  };

  return {
    notifications,
    resolveNotification,
    addLimitChangeNotification,
  };
};

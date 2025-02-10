
import { useState } from "react";
import { Notification } from "@/types/admin";

export const useNotifications = () => {
  // Mock notifications data (this could be fetched from Supabase in the future)
  const notifications: Notification[] = [
    { id: 1, type: "producer", message: "Novo produtor aguardando aprovação", date: "2024-03-20", status: "pending" },
    { id: 2, type: "client", message: "Cliente solicitou alteração de dados bancários", date: "2024-03-19", status: "pending" },
  ];

  const handleResolveNotification = (id: number) => {
    // This could be moved to a notifications hook when implementing real notification handling
    console.log("Resolving notification:", id);
  };

  return {
    notifications,
    handleResolveNotification,
  };
};


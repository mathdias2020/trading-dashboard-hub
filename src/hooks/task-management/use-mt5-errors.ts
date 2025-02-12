
import { useState } from "react";
import { MT5Error } from "@/types/task";

export const useMT5Errors = () => {
  const [mt5Errors] = useState<MT5Error[]>([
    { id: 1, code: "ERR_001", description: "Email não autorizado pelo produtor" },
    { id: 2, code: "ERR_002", description: "Conta MT5 não encontrada" },
    { id: 3, code: "ERR_003", description: "Configuração inválida" },
  ]);

  return { mt5Errors };
};

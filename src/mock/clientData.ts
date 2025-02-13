
import { Client } from "@/types/client";

export const mockClients: Client[] = [
  {
    id: "1",
    name: "Cliente 1",
    account_number: "001",
    monthly_result: 1500,
    status: "Ativo",
    producer_id: "1",
    email: "cliente1@example.com",
    mt5_account: "MT5001",
    mt5_password: "senha123",
    contracts: 2,
    max_contracts: 5,
    algo_trading: true,
    needs_password_change: false,
    subscription_date: "2024-01-01",
    mt5_balance: 10000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Cliente 2",
    account_number: "002",
    monthly_result: 2500,
    status: "Ativo",
    producer_id: "1",
    email: "cliente2@example.com",
    mt5_account: "MT5002",
    mt5_password: "senha456",
    contracts: 3,
    max_contracts: 5,
    algo_trading: false,
    needs_password_change: false,
    subscription_date: "2024-01-15",
    mt5_balance: 15000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Cliente 3",
    account_number: "003",
    monthly_result: 1800,
    status: "Aguardando Pagamento",
    producer_id: "2",
    email: "cliente3@example.com",
    mt5_account: "MT5003",
    mt5_password: "senha789",
    contracts: 1,
    max_contracts: 3,
    algo_trading: true,
    needs_password_change: true,
    subscription_date: "2024-02-01",
    mt5_balance: 8000,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

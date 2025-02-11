
import { Client } from "@/types/client";

export const mockClients: Client[] = [
  {
    id: 1,
    name: "Cliente 1",
    accountNumber: "001",
    monthlyResult: 1500,
    status: "Ativo",
    producerId: 1,
    email: "cliente1@example.com",
    mt5Account: "MT5001",
    mt5Password: "senha123",
    contracts: 2,
    maxContracts: 5,
    algoTrading: true,
    producerCode: "PROD001",
    needsPasswordChange: false,
    subscriptionDate: "2024-01-01",
    mt5Balance: 10000,
    result: 1500
  },
  {
    id: 2,
    name: "Cliente 2",
    accountNumber: "002",
    monthlyResult: 2500,
    status: "Ativo",
    producerId: 1,
    email: "cliente2@example.com",
    mt5Account: "MT5002",
    mt5Password: "senha456",
    contracts: 3,
    maxContracts: 5,
    algoTrading: false,
    producerCode: "PROD001",
    needsPasswordChange: false,
    subscriptionDate: "2024-01-15",
    mt5Balance: 15000,
    result: 2500
  },
  {
    id: 3,
    name: "Cliente 3",
    accountNumber: "003",
    monthlyResult: 1800,
    status: "Pendente",
    producerId: 2,
    email: "cliente3@example.com",
    mt5Account: "MT5003",
    mt5Password: "senha789",
    contracts: 1,
    maxContracts: 3,
    algoTrading: true,
    producerCode: "PROD002",
    needsPasswordChange: true,
    subscriptionDate: "2024-02-01",
    mt5Balance: 8000,
    result: 1800
  }
];

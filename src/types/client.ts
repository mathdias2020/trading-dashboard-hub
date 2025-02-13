
export type Client = {
  id: string;
  producer_id: string;
  name: string;
  email: string;
  account_number: string;
  status: string;
  contracts: number;
  max_contracts: number;
  algo_trading: boolean;
  mt5_account?: string;
  mt5_password?: string;
  mt5_balance: number;
  monthly_result: number;
  subscription_date: string;
  created_at: string;
  updated_at: string;
};


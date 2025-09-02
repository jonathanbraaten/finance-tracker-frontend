export type Transaction = {
  id: number;
  user_id: number;
  amount: number;
  category: string;
  transaction_type: 'expense' | 'income';
  transaction_status: 'pending' | 'cleared' | 'failed';
  deleted_at: null;
  created_at: Date;
  occurred_at: Date;
};

import {
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  HandCoins,
} from 'lucide-react';

import { Budget, Transaction } from 'lib/types/transaction';
import numberFormat from 'app/utils/numberFormat';
type Props = {
  tx: Transaction[];
  budget: Budget;
};

export default function KpiCard({ tx, budget }: Props) {
  const expenses = tx
    .filter(
      (v) =>
        v.transaction_type === 'expense' && v.transaction_status === 'cleared',
    )
    .reduce((acc, cur) => (acc += cur.amount), 0);
  const income = tx
    .filter(
      (v) =>
        v.transaction_type === 'income' && v.transaction_status === 'cleared',
    )
    .reduce((acc, cur) => (acc += cur.amount), 0);
  const calculateBudget = budget.amount ?? 0;
  const data = [
    {
      id: 1,
      title: 'Current Balance',
      total: numberFormat(income - expenses),
      icon: <Wallet size={16} />,
    },

    {
      id: 2,
      title: 'Expenses',
      total: numberFormat(expenses),
      icon: <ArrowDownCircle size={16} />,
    },
    {
      id: 3,
      title: 'Budget',
      total: numberFormat(calculateBudget),
      icon: <HandCoins size={16} />,
    },
    {
      id: 4,
      title: 'Remaining budget',
      total: calculateBudget > 0 ? numberFormat(calculateBudget - expenses) : 0,
      icon: <ArrowUpCircle size={16} />,
    },
  ];
  return (
    <>
      {data.map((v) => (
        <div
          className="bg-white border border-gray-100 p-1 rounded-md py-5 px-2"
          key={v.id}
        >
          <div className="flex items-center gap-2 text-sm mb-2">
            <span className="bg-gray-100 rounded-full p-1">{v.icon}</span>{' '}
            <p>{v.title}</p>
          </div>
          <span className="p-1 text-xl font-medium">${v.total}</span>
        </div>
      ))}
    </>
  );
}

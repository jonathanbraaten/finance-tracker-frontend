import Chart from 'app/components/dashboard/charts';
import KpiCard from 'app/components/dashboard/kpi';

import { API_URL } from 'lib/env';
import { Budget, Transaction } from 'lib/types/transaction';
import { cookies } from 'next/headers';

async function getData() {
  const cookie = (await cookies()).toString();
  async function getTransactions(): Promise<Transaction[]> {
    const response = await fetch(`${API_URL}/transactions?year=2025&from=13`, {
      credentials: 'include',
      headers: {
        Cookie: cookie,
      },
      cache: 'no-store',
    });
    return response.json();
  }

  async function getBudget(): Promise<Budget> {
    const response = await fetch(`${API_URL}/budget`, {
      credentials: 'include',
      headers: {
        Cookie: cookie,
      },
      cache: 'no-store',
    });
    return response.json();
  }

  return {
    getTransactions,
    getBudget,
  };
}

export default async function Dashboard() {
  const { getTransactions, getBudget } = await getData();
  const tx = await getTransactions();
  const budget = await getBudget();
  return (
    <div className="flex flex-col gap-10 py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        <KpiCard tx={tx} budget={budget} />
      </div>
      <div className="my-auto w-full border border-gray-200 p-1 rounded-md h-[50vh]">
        <Chart tx={tx} />
      </div>
    </div>
  );
}

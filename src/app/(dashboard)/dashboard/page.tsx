import Chart from 'app/components/dashboard/charts';
import KpiCard from 'app/components/dashboard/kpi';

import { API_URL } from 'lib/env';
import { Transaction } from 'lib/types/transaction';
import { cookies } from 'next/headers';

async function getTransactions(): Promise<Transaction[]> {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${API_URL}/transactions`, {
    credentials: 'include',
    headers: {
      Cookie: cookie,
    },
    cache: 'no-store',
  });
  return response.json();
}

export default async function Dashboard() {
  const tx = await getTransactions();

  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-3 gap-2">
        <KpiCard tx={tx} />
      </div>
      <div className="my-auto w-full border border-gray-200 p-1 rounded-md h-[50vh]">
        <Chart tx={tx} />
      </div>
    </div>
  );
}

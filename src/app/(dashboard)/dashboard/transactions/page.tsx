import { section } from 'framer-motion/client';
import TransactionsTable from './table';
import { API_URL } from 'lib/env';
import { Transaction } from 'lib/types/transaction';
import { cookies } from 'next/headers';
import Something from './components/something';
async function getTransactions(): Promise<Transaction[]> {
  const cookie = (await cookies()).toString();
  const response = await fetch(`${API_URL}/transactions`, {
    credentials: 'include',
    headers: {
      Cookie: cookie,
    },
    cache: 'default',
  });
  return response.json();
}
export default async function Page() {
  const tx = await getTransactions();
  return (
    <section className="flex flex-col gap-10">
      <Something />
      <TransactionsTable tx={tx} />
    </section>
  );
}

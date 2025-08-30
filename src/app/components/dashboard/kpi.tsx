/* 📊 Core Dashboard Cards
	1.	Current Balance
	•	Total balance
	•	Change vs. last month (▲/▼)
	2.	Income (This Month)
	•	Total credited this month
	•	% change vs. last month
	3.	Expenses (This Month)
	•	Total debited this month
	•	% change vs. last month
	4.	Budget Remaining
	•	Progress bar (% of monthly budget used)
	•	Warning badge if >75% used
	5.	Recent Transactions
	•	Last 5 items (category, amount, status)
 */

import { div } from 'framer-motion/client';

export default function KpiCard() {
  const mockData = [
    {
      key: 'currentBalance',
      title: 'Current Balance',
      total: 5200,
      changeVsLastMonth: 150, // positive means ▲, negative ▼
    },
    {
      key: 'incomeThisMonth',
      title: 'Income',
      total: 3200,
      percentChangeVsLastMonth: 8.5, // positive means ▲, negative ▼
    },
    {
      key: 'expensesThisMonth',
      title: 'Expenses',
      total: 2100,
      percentChangeVsLastMonth: -3.2, // positive means ▲, negative ▼
    },
  ];
  return (
    <>
      {mockData.map((v) => (
        <div className="border border-gray-200 p-1 rounded-md" key={v.key}>
          <p>{v.title}</p>
          <p>{v.total}</p>
        </div>
      ))}
    </>
  );
}

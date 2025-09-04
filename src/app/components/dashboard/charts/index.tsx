'use client';
import * as echarts from 'echarts';
import { Transaction } from 'lib/types/transaction';
import { useEffect, useRef } from 'react';
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default function Chart({ tx }: { tx: Transaction[] }) {
  /**
   * Container.
   */
  const container = useRef(null);

  /**
   * Data.
   */
  const income = Array(12).fill(0);
  const expenses = Array(12).fill(0);

  for (const t of tx) {
    if (t.transaction_status !== 'cleared') continue;
    const m = new Date(t.occurred_at).getUTCMonth(); // 0..11
    console.log(m);
    if (t.transaction_type === 'income') income[m] += t.amount;
    if (t.transaction_type === 'expense') expenses[m] += t.amount;
  }

  /**
   * Echarts option.
   */
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Income', 'Expenses'] },
    xAxis: {
      type: 'category',
      data: month.map((v) => v),
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Income',
        type: 'bar',
        data: income,
        backgroundStyle: {
          col3or: 'orange',
        },
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: expenses,
      },
    ],
  };

  /**
   * Initialize.
   */
  useEffect(() => {
    if (!container.current) return;
    const chart = echarts.init(container.current);
    chart.setOption(option);
    const onResize = () => chart.resize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.dispose();
    };
  });

  return <div ref={container} className="w-full h-full" />;
}

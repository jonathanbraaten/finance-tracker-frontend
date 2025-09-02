'use client';
import * as echarts from 'echarts';
import { Transaction } from 'lib/types/transaction';
import { useEffect, useRef } from 'react';

export default function Chart({ tx }: { tx: Transaction[] }) {
  /**
   * Container.
   */
  const container = useRef(null);

  /**
   * Data.
   */
  const income = tx
    .filter(
      (v) =>
        v.transaction_type === 'income' && v.transaction_status === 'cleared',
    )
    .map((v) => v.amount)
    .map((v) => v);

  const expense = tx
    .filter(
      (v) =>
        v.transaction_type === 'expense' && v.transaction_status === 'cleared',
    )
    .map((v) => v.amount)
    .map((v) => v);

  /**
   * Echarts option.
   */
  const option = {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Income', 'Expenses'] },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yAxis: { type: 'value' },
    series: [
      {
        name: 'Income',
        type: 'bar',
        data: income,
        backgroundStyle: {
          color: 'orange',
        },
      },
      {
        name: 'Expenses',
        type: 'bar',
        data: expense,
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

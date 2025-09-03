'use client';
import formatDateISO from 'app/utils/formatDateISO';
import { Transaction } from 'lib/types/transaction';
import { API_URL_PUBLIC } from 'lib/env';
import { useRouter } from 'next/navigation';
import RenderCell from './components/cell';
import React, { useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@heroui/react';

const columns = [
  { name: 'CATEGORY', uid: 'category' },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'STATUS', uid: 'status' },
  { name: 'OCCURRED', uid: 'occurred' },
  { name: 'ACTIONS', uid: 'actions' },
];

export default function TransactionTable({ tx }: { tx: Transaction[] }) {
  /**
   * Router.
   */
  const router = useRouter();

  /**
   * Create rows from transactions data.
   */
  const rows = tx.map((t) => {
    return {
      id: t.id,
      category: t.category,
      status: t.transaction_status,
      amount: `$ ${t.amount}`,
      occurred: formatDateISO(t.created_at),
    };
  });

  /**
   * Transaction handler.
   */
  async function deleteTx(id: string) {
    try {
      const response = await fetch(`${API_URL_PUBLIC}/transactions/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const results = await response.json();
      if (!response.ok) {
        throw new Error(results.message ?? 'Unexpected error');
      }

      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }

  return (
    <Table selectionMode="single" aria-label="Transactions">
      <TableHeader columns={columns}>
        {(col) => (
          <TableColumn
            key={col.uid}
            align={col.uid === 'actions' ? 'center' : 'start'}
          >
            {col.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                <RenderCell
                  row={item}
                  //@ts-expect-error
                  columnKey={columnKey}
                  onAction={deleteTx}
                />
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

'use client';
import type { Key, SVGProps } from 'react';
import type { ChipProps } from '@heroui/react';

import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from '@heroui/react';
import formatDateISO from 'app/utils/formatDateISO';
import { Transaction } from 'lib/types/transaction';
import { API_URL_PUBLIC } from 'lib/env';
import router, { useRouter } from 'next/navigation';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
type Row = {
  id: number;
  category: string;
  status: string;
  amount: string;
  occurred: string;
};

const columns = [
  { name: 'CATEGORY', uid: 'category' },
  { name: 'AMOUNT', uid: 'amount' },
  { name: 'STATUS', uid: 'status' },
  { name: 'OCCURRED', uid: 'occurred' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const DeleteIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const EditIcon = (props: IconSvgProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </svg>
  );
};
const statusColorMap: Record<string, ChipProps['color']> = {
  cleared: 'success',
  failed: 'danger',
  pending: 'warning',
};

export default function TransactionTable({ tx }: { tx: Transaction[] }) {
  const [rerenderKey, setRerendeKey] = useState(0);

  const router = useRouter();
  const rows = tx.map((t) => {
    return {
      id: t.id,
      category: t.category,
      status: t.transaction_status,
      amount: `$ ${t.amount}`,
      occurred: formatDateISO(t.created_at),
    };
  });

  const renderCell = useCallback((rows: Row, columnKey: Key) => {
    const cellValue = rows[columnKey as keyof Row];

    switch (columnKey) {
      case 'category':
        return <div>{rows.category}</div>;
      case 'status':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[rows.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit transaction">
              <span
                id={rows.id.toString()}
                onClick={() => getTransaction(rows.id.toString(), 'update')}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete ">
              <span
                onClick={() => getTransaction(rows.id.toString(), 'delete')}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  async function getTransaction(id: string, action: 'update' | 'delete') {
    try {
      const response = await fetch(`${API_URL_PUBLIC}/transactions/${id}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        credentials: 'include',
      });

      const results = await response.json();
      if (!response.ok) {
        throw new Error(results.message ?? 'Unexpected error');
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
      }
    }
  }
  return (
    <Table
      key={rerenderKey}
      defaultSelectedKeys={['2']}
      selectionMode="single"
      aria-label="Example table with custom cells"
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={'No transactions to display.'} items={rows}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

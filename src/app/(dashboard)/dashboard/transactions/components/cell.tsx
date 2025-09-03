import { ChipProps } from '@heroui/react';
import { Chip, Tooltip } from '@heroui/react';
import { Pen, Pencil, Trash, X, Check } from 'lucide-react';
import { useState } from 'react';
type Props = {
  row: Row;
  columnKey: Key;
  onAction: (id: string) => void;
};

type Row = {
  id: number;
  category: string;
  status: 'cleared' | 'pending' | 'failed';
  amount: string;
  occurred: string;
};

const statusColorMap = {
  cleared: 'success',
  failed: 'danger',
  pending: 'warning',
} as const;

type Key = keyof Row | 'actions';

export default function RenderCell({ row, columnKey, onAction }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const cellValue = row[columnKey as keyof Row];
  const openConfirm = () => setConfirmDelete(true);
  const abortConfirm = () => setConfirmDelete(false);
  const confirmDeleteNow = (id: string) => {
    onAction(id);
  };
  switch (columnKey) {
    case 'category':
      return <div>{row.category}</div>;

    case 'status':
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[row.status]}
          size="sm"
          variant="flat"
        >
          {row.status}
        </Chip>
      );

    case 'actions':
      return (
        <div className="relative flex items-center gap-2">
          {confirmDelete ? (
            <Tooltip content="Abort">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={abortConfirm}
              >
                <X size={16} />
              </span>
            </Tooltip>
          ) : (
            <Tooltip content="Edit transaction">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <Pencil size={16} />
              </span>
            </Tooltip>
          )}

          {confirmDelete ? (
            <Tooltip color="danger" content="Delete">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => confirmDeleteNow(String(row.id))}
              >
                <Check size={16} color="#f92222" />
              </span>
            </Tooltip>
          ) : (
            <Tooltip color="danger" content="Delete">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={openConfirm}
              >
                <Trash size={16} color="#f92222" />
              </span>
            </Tooltip>
          )}
        </div>
      );

    default:
      return <>{cellValue as React.ReactNode}</>;
  }
}

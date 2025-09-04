import { Chip, Tooltip } from '@heroui/react';
import { Pencil, Trash, X, Check } from 'lucide-react';
import { useState } from 'react';

/**
 * Types.
 */
type Row = {
  id: number;
  category: string;
  status: 'cleared' | 'pending' | 'failed';
  amount: string;
  occurred: string;
};

type Key = keyof Row | 'actions';
type Props = {
  row: Row;
  columnKey: Key;
  onAction: (id: string) => void;
};
/**
 * Colors.
 */
const statusColorMap = {
  cleared: 'success',
  failed: 'danger',
  pending: 'warning',
} as const;

export default function RenderCell({ row, columnKey, onAction }: Props) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const cellValue = row[columnKey as keyof Row];

  /**
   * Open confirmation.
   */
  const openConfirm = () => setConfirmDelete(true);

  /**
   * Close confirmation.
   */
  const closeConfirm = () => setConfirmDelete(false);

  /**
   * Confirm delete.
   */
  const confirmDeleteNow = (id: string) => {
    onAction(id);
  };

  /**
   * Column keys
   */
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
                onClick={closeConfirm}
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

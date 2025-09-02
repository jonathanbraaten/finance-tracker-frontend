import { formatISO } from 'date-fns';
export default function formatDateISO(input: Date) {
  return formatISO(new Date(input), { representation: 'date' });
}

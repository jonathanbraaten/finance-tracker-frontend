'use client';
import {
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  Tags,
  Settings,
} from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavItem = Record<
  string,
  {
    id: number;
    href: string;
    label: string;
    icon: React.ReactNode;
  }[]
>;

export default function Sidebar() {
  const pathName = usePathname();

  const navItem: NavItem = {
    top: [
      {
        id: 1,
        href: '/dashboard',
        label: 'Dashboard',
        icon: <LayoutDashboard size={16} />,
      },
      {
        id: 2,
        href: '/dashboard/transactions',
        label: 'Transactions',
        icon: <ReceiptText size={16} />,
      },
      {
        id: 3,
        href: '/reports',
        label: 'Reports',
        icon: <BarChart3 size={16} />,
      },
    ] as const,
    bottom: [
      {
        id: 4,
        href: '/categories',
        label: 'Categories',
        icon: <Tags size={16} />,
      },
      {
        id: 5,
        href: '/settings',
        label: 'Settings',
        icon: <Settings size={16} />,
      },
    ] as const,
  };

  return (
    <nav className="border-r border-gray-200 text-sm">
      <div className="px-4 py-5">logo</div>
      <hr className="text-gray-200  mb-3" />
      <ul className="flex flex-col gap-1 px-2">
        {navItem['top'].map((l) => (
          <li key={l.id}>
            <Link
              className={clsx(
                'flex items-center gap-1 px-2 py-1 hover:bg-gray-100 hover:rounded-md transition',
                {
                  'bg-gray-100 ': pathName === l.href,
                },
              )}
              href={`${l.href}`}
            >
              {l.icon}
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <hr className="text-gray-200 mt-10 mb-5" />
      <ul className="flex flex-col gap-1 px-2">
        {navItem['bottom'].map((l) => (
          <li key={l.id}>
            <Link
              className="flex items-center gap-1 px-2 py-1 hover:bg-gray-200 hover:rounded-md transition"
              href={`${l.href}`}
            >
              {l.icon}
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import {
  LayoutDashboard,
  ReceiptText,
  BarChart3,
  Tags,
  Settings,
} from 'lucide-react';

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
        href: '/transactions',
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
      <ul>
        {navItem['top'].map((l) => (
          <li className="flex gap-1" key={l.id}>
            {l.icon}
            {l.label}
          </li>
        ))}
      </ul>
      <hr className="text-gray-200" />
      <ul>
        {navItem['bottom'].map((l) => (
          <li className="flex gap-1" key={l.id}>
            {l.icon}
            {l.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}

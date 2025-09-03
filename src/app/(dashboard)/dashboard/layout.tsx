import Header from 'app/components/dashboard/header';
import Sidebar from 'app/components/dashboard/sidebar';
import { Providers } from 'app/providers';
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <section className="h-screen flex">
        <Sidebar />
        <div className="flex flex-col  grow">
          <Header />
          <section className="grow px-2 bg-cyan-100/10">{children}</section>
        </div>
      </section>
    </Providers>
  );
}

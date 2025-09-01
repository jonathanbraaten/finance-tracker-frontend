import Header from 'app/components/dashboard/header';
import Sidebar from 'app/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-screen flex">
      <Sidebar />
      <div className="flex flex-col  grow">
        <Header />
        <section className="grow px-2 bg-gray-100/20">{children}</section>
      </div>
    </section>
  );
}

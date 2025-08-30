import Header from 'app/components/dashboard/header';
import Sidebar from 'app/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <section className="h-screen flex">
          <Sidebar />
          <div className="flex flex-col  grow">
            <Header />
            <main className="grow">{children}</main>
          </div>
        </section>
      </body>
    </html>
  );
}

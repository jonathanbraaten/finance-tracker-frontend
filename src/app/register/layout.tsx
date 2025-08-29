export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex items-center justify-center  h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}

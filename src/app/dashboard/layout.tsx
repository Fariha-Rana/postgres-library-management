export default function DashboardLayout({
  children,
  borrowedbooks,
  popularbooks,
  overduebooks,
}: Readonly<{
  children: React.ReactNode;
  borrowedbooks: React.ReactNode;
  popularbooks: React.ReactNode;
  overduebooks: React.ReactNode;
}>) {
  return (
    <section>
      {children}
      {borrowedbooks}
      {popularbooks}
      {overduebooks}
    </section>
  );
}

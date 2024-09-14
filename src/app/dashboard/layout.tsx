export default function DashboardLayout({
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
    <section className="mt-8">
      {borrowedbooks}
      {popularbooks}
      {overduebooks}
    </section>
  );
}

import Table from "@/components/Table";
import dbConnection from "@/database/connection";

interface Transactions {
  transaction_id: number;
  book_id: number;
  borrow_date: string;
  return_date: string;
  due_date: string;
}

const TransactionsPage = async () => {
  const res = await dbConnection.query("SELECT * FROM transactions");
  const transactions = res?.rows;

  if (!transactions) return <p>No Transactions found</p>;
  return (
    <>
      <Table<Transactions>
        heading="Transactions List"
        tableHeadings={[
          "Transaction ID",
          "Book ID",
          "Borrow Date",
          "Due Date",
          "Return Date",
        ]}
        tableBodyData={transactions}
        renderRow={(tx) => (
          <>
            <td>{tx.transaction_id}</td>
            <td>{tx.book_id}</td>
            <td>{new Date(tx.borrow_date).toDateString()}</td>
            <td>{new Date(tx.due_date).toDateString()}</td>
            <td>{new Date(tx.return_date).toDateString()}</td>
          </>
        )}
      />
    </>
  );
};

export default TransactionsPage;

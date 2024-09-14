import ResponseMessage from "@/components/ResponseMessage";
import Table from "@/components/Table";
import dbConnection from "@/database/connection";
import { Transactions } from "@/database/utils/type";

const TransactionsPage = async () => {
  const res = await dbConnection.query(
    "SELECT * FROM transactions order by transaction_id desc"
  );
  const transactions = res?.rows || [];
  if (transactions.length === 0)
    return <ResponseMessage message="No Transactions Found" />;
  return (
    <>
      <Table<Transactions>
        heading="Transactions List"
        tableHeadings={[
          "Transaction ID",
          "Book ID",
          "Member ID",
          "Borrow Date",
          "Due Date",
          "Return Date",
        ]}
        tableBodyData={transactions}
        renderRow={(tx) => (
          <>
            <td>{tx.transaction_id}</td>
            <td>{tx.book_id}</td>
            <td>{tx.member_id}</td>
            <td>{new Date(tx.borrow_date).toISOString().split("T")[0]}</td>
            <td>{new Date(tx.due_date).toISOString().split("T")[0]}</td>
            <td>
              {" "}
              {tx.return_date
                ? new Date(tx.return_date).toDateString()
                : "Not Returned"}
            </td>
          </>
        )}
      />
    </>
  );
};

export default TransactionsPage;

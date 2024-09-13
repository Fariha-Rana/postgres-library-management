import Table from "@/components/Table";
import { Transactions } from "@/database/utils/type";

interface Props {
  transactions: Transactions[];
}
const TransactionsPage: React.FC<Props> = ({ transactions }) => {
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

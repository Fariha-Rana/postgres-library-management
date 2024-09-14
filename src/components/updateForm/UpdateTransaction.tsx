import { updateTransaction } from "@/database/actions/update.actions";
import dbConnection from "@/database/connection";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import ResponseMessage from "../ResponseMessage";

export default async function UpdateTransactionForm() {
  const _updateTransactionWithId: (formData: FormData) => Promise<void> =
    updateTransaction.bind(null, 53);
  const res = await dbConnection.query(
    "SELECT * FROM Transactions WHERE transaction_id = $1",
    [53]
  );
  const Transaction = res.rows[0];

  if (!Transaction) {
    return <ResponseMessage message="Transaction not found" />;
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Update Transaction</h2>
      <form action={_updateTransactionWithId} className="space-y-4">
        <LabelandInput
          label="Member ID"
          id="memberId"
          type="number"
          name="memberId"
          defaultValue={Transaction.member_id}
        />
        <LabelandInput
          label="Book ID"
          id="bookId"
          type="number"
          name="bookId"
          defaultValue={Transaction.book_id}
        />
        <LabelandInput
          label="Borrow Date"
          id="borrowDate"
          type="text"
          name="borrowDate"
          defaultValue={
            new Date(Transaction.borrow_date).toISOString().split("T")[0]
          }
        />
        <LabelandInput
          label="Return Date"
          id="returnDate"
          type="text"
          name="returnDate"
          defaultValue={
            !Transaction.return_date
              ? "Not Returned"
              : new Date(Transaction.return_date).toISOString().split("T")[0]
          }
        />

        <LabelandInput
          label="Due Date"
          id="dueDate"
          type="text"
          name="dueDate"
          defaultValue={new Date(Transaction.due_date).toDateString()}
        />
        <SubmitButton label="Update Transaction" />
      </form>
    </>
  );
}

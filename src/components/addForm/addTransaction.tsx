import { addTransactions } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";

const AddTransactionForm = () => {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Transaction</h2>
      <form
        action={addTransactions}
        className="flex flex-col gap-6 text-sm text-nowrap"
      >
        <LabelandInput
          label="Member ID"
          id="memberId"
          type="number"
          name="memberId"
        />
        <LabelandInput
          label="Book ID"
          id="bookId"
          type="number"
          name="bookId"
        />
        <LabelandInput
          label="Borrow Date"
          id="borrowDate"
          type="date"
          name="borrowDate"
        />
        <LabelandInput
          label="Due Date"
          id="dueDate"
          type="date"
          name="dueDate"
        />
        <SubmitButton label="Add Transaction" />
        {/* {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>} */}
      </form>
    </div>
  );
};

export default AddTransactionForm;

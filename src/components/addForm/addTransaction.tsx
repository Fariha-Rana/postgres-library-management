" use client";
import { addTransactions } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import { useFormState } from "react-dom";

const AddTransactionForm = () => {
  const [state, formAction] = useFormState(
    (_: unknown, formData: FormData) => addTransactions(formData),
    null
  );
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Transaction</h2>
      <form
        action={formAction}
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
        {state?.errorMessage && (
          <p className="text-red-500 mt-2">{state.errorMessage}</p>
        )}
        {state?.successMessage && (
          <p className="text-green-500 mt-2">{state.successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default AddTransactionForm;

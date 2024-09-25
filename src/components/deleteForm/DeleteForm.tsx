import { deleteRow } from "@/database/actions/delete.actions";
import { useFormState } from "react-dom";
function DeleteForm({
  table_name,
  IdName,
}: {
  table_name: string;
  IdName: string;
}) {
  const _deleteRow = deleteRow.bind(null, table_name, IdName);
  const [state, formAction] = useFormState(
    (_: unknown, formData: FormData) => _deleteRow(formData),
    null
  );

  return (
    <div>
      <h2>Delete {IdName}</h2>
      <form action={formAction} className="mt-4">
        <input
          className="w-max px-4 py-2 m-4"
          type="text"
          placeholder="Enter ID"
          name="id"
        />
        <button
          className="px-3 py-2 rounded hover:opacity-70 bg-gray-800 text-white"
          type="submit"
        >
          delete
        </button>
      </form>
      {state?.successMessage && (
        <p className="text-green-500">{state.successMessage}</p>
      )}
      {state?.errorMessage && (
        <p className="text-red-500">{state.errorMessage}</p>
      )}
    </div>
  );
}

export default DeleteForm;

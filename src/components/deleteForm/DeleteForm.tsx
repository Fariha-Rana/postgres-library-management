import { deleteRow } from "@/database/actions/delete.actions";

function DeleteForm({
  table_name,
  IdName,
}: {
  table_name: string;
  IdName: string;
}) {
  const _deleteRow = deleteRow.bind(null, table_name, IdName);

  return (
    <div>
      <h2>Delete {IdName}</h2>
      <form action={_deleteRow} className="mt-4">
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
    </div>
  );
}

export default DeleteForm;

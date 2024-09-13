import { addBooks } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";

const AddBookForm = () => {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Book</h2>
      <form action={addBooks} className="flex flex-col gap-6 text-sm">
        <LabelandInput label="Title" id="title" type="text" name="title" />
        <LabelandInput
          label="Author ID"
          id="authorId"
          type="number"
          name="authorId"
        />
        <LabelandInput label="Genre" id="genre" type="text" name="genre" />
        <LabelandInput label="ISBN" id="isbn" type="text" name="isbn" />
        <LabelandInput
          label="Publish Date"
          id="publishDate"
          type="date"
          name="publishDate"
        />
        <LabelandInput
          label="Available Copies"
          id="availableCopies"
          type="number"
          name="availableCopies"
        />
        {<SubmitButton label="Add Book" />}
        {/* {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>} */}
      </form>
    </div>
  );
};

export default AddBookForm;

"use client";
import { addBooks } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import { useFormState } from "react-dom";

const AddBookForm = () => {
  const [state, formAction] = useFormState(
    (_: unknown, formData: FormData) => addBooks(formData),
    null
  );

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Book</h2>
      <form action={formAction} className="flex flex-col gap-6 text-sm">
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
export default AddBookForm;

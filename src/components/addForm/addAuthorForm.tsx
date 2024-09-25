"use client";
import { addAuthors } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import { useFormState } from "react-dom";

const AddAuthorForm = () => {
  const [state, formAction] = useFormState(
    (_: unknown, formData: FormData) => addAuthors(formData),
    null
  );
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Author</h2>
      <form
        action={formAction}
        className="flex flex-col gap-6 text-sm text-nowrap"
      >
        <LabelandInput
          label="First Name"
          id="first-name"
          type="text"
          name="firstName"
        />
        <LabelandInput
          label="Last Name"
          id="last-name"
          type="text"
          name="lastName"
        />
        <LabelandInput
          label="Nationality"
          id="nationality"
          type="text"
          name="nationality"
        />
        <LabelandInput
          label="Birth Date"
          id="birthdate"
          type="date"
          name="birthdate"
        />
        <SubmitButton label="Add Author" />
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

export default AddAuthorForm;

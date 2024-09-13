import { addAuthors } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";

const AddAuthorForm = () => {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Author</h2>
      <form
        action={addAuthors}
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
        {/* {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>} */}
      </form>
    </div>
  );
};

export default AddAuthorForm;

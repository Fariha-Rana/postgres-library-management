import { addMembers } from "@/database/actions/add.actions";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";

const AddMemberForm = () => {
  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-6">Add New Member</h2>
      <form action={addMembers} className="flex flex-col gap-6 text-sm">
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
          label="Email Address"
          id="email"
          type="email"
          name="email"
        />
        <LabelandInput
          label="Phone Number"
          id="phone"
          type="text"
          name="phone"
        />
        <LabelandInput
          label="Registration Date"
          id="registrationDate"
          type="date"
          name="registrationDate"
        />
        <SubmitButton label="Add Member" />
        {/* {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">{success}</p>} */}
      </form>
    </div>
  );
};

export default AddMemberForm;

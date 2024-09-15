import { updateMember } from "@/database/actions/update.actions";
import dbConnection from "@/database/connection";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import ResponseMessage from "../ResponseMessage";

export default async function UpdateMemberForm() {
  const _updateMemberWithId: (formData: FormData) => Promise<void> =
    updateMember.bind(null, 26);
  const res = await dbConnection.query(
    "SELECT * FROM Members WHERE Member_id = $1",
    [26]
  );
  const Member = res?.rows[0] || [];

  if (Member.length === 0) {
    return <ResponseMessage message="Member not found" />;
  }
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Update Member</h2>
      <form action={_updateMemberWithId} className="space-y-4">
        <LabelandInput
          label="First Name"
          id="first-name"
          type="text"
          name="firstName"
          defaultValue={Member.first_name}
        />
        <LabelandInput
          label="Last Name"
          id="last-name"
          type="text"
          name="lastName"
          defaultValue={Member.last_name}
        />
        <LabelandInput
          label="Email Address"
          id="email"
          type="email"
          name="email"
          defaultValue={Member.email}
        />
        <LabelandInput
          label="Phone Number"
          id="phone"
          type="phone"
          name="phone"
          defaultValue={Member.phone}
        />
        <LabelandInput
          label="Registration Date"
          id="registrationDate"
          type="date"
          name="registrationDate"
          defaultValue={new Date(Member.registration_date).toDateString()}
        />
        <SubmitButton label="Update Member" />
      </form>
    </>
  );
}

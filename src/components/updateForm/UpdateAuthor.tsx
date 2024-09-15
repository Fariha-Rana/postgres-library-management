import { updateAuthor } from "@/database/actions/update.actions";
import dbConnection from "@/database/connection";
import LabelandInput from "../formComp/Label-Input";
import SubmitButton from "../formComp/SubmitButton";
import ResponseMessage from "../ResponseMessage";

export default async function UpdateAuthorForm() {
  const _updateAuthorWithId: (formData: FormData) => Promise<void> =
    updateAuthor.bind(null, 40);
  const res = await dbConnection.query(
    "SELECT * FROM Authors WHERE author_id = $1",
    [40]
  );
  const Author = res?.rows[0] || [];
  if (Author.length === 0) {
    return <ResponseMessage message="Author not found" />;
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Update Author</h2>
      <form action={_updateAuthorWithId} className="space-y-4">
        <LabelandInput
          label="First Name"
          id="firstName"
          type="text"
          name="firstName"
          defaultValue={Author.first_name}
        />
        <LabelandInput
          label="Last Name"
          id="lastName"
          type="text"
          name="lastName"
          defaultValue={Author.last_name}
        />
        <LabelandInput
          label="Nationality"
          id="nationality"
          type="text"
          name="nationality"
          defaultValue={Author.nationality}
        />
        <LabelandInput
          label="Birth Date"
          id="birthdate"
          type="text"
          name="birthdate"
          defaultValue={
            Author.birthdate ? new Date(Author.birthdate).toDateString() : ""
          }
        />
        <SubmitButton label="Update Author" />
      </form>
    </>
  );
}

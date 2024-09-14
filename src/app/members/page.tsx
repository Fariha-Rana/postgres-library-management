import ResponseMessage from "@/components/ResponseMessage";
import Table from "@/components/Table";
import dbConnection from "@/database/connection";
import { Members } from "@/database/utils/type";

const MembersPage = async () => {
  const res = await dbConnection.query(
    "SELECT * FROM members order by member_id desc"
  );
  const members = res?.rows || [];
  if (members.length === 0)
    return <ResponseMessage message="No Members Found" />;

  return (
    <>
      <Table<Members>
        heading="Members List"
        tableHeadings={[
          "Member ID",
          "First Name",
          "Last Name",
          "Email",
          "Phone Number",
          "Registration Date",
        ]}
        tableBodyData={members}
        renderRow={(member) => (
          <>
            <td>{member.member_id}</td>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.email}</td>
            <td>{member.phone}</td>
            <td>{new Date(member.registration_date).toDateString()}</td>
          </>
        )}
      />
    </>
  );
};

export default MembersPage;

import Table from "@/components/Table";
import { Members } from "@/database/utils/type";

interface Props {
  members: Members[];
}

const SearchMembers: React.FC<Props> = ({ members }) => {
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

export default SearchMembers;

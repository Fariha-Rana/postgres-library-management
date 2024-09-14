import ResponseMessage from "@/components/ResponseMessage";
import Table from "@/components/Table";
import dbConnection from "@/database/connection";
import { Authors } from "@/database/utils/type";

const AuthorsPage = async () => {
  const res = await dbConnection.query(
    "SELECT * FROM authors order by author_id desc"
  );

  const authors = res?.rows || [];
  if (authors.length === 0)
    return <ResponseMessage message="No Authors Found" />;

  return (
    <Table<Authors>
      heading="Authors List"
      tableHeadings={[
        "ID",
        "First Name",
        "Last Name",
        "Birthdate",
        "Nationality",
      ]}
      tableBodyData={authors}
      renderRow={(author) => (
        <>
          <td>{author.author_id}</td>
          <td>{author.first_name}</td>
          <td>{author.last_name}</td>
          <td>{new Date(author.birthdate).toDateString()}</td>
          <td>{author.nationality}</td>
        </>
      )}
    />
  );
};

export default AuthorsPage;

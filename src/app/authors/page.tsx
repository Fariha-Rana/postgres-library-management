import Table from "@/components/Table";
import dbConnection from "@/database/connection";

interface Authors {
  author_id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  nationality: string;
}

const AuthorsPage = async () => {
  const res = await dbConnection.query("SELECT * FROM authors");
  const authors = res?.rows;
  console.log(authors);
  if (!authors) return <p>No Authors found</p>;
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

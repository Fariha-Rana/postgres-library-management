import { Authors } from "@/database/utils/type";
import Table from "../Table";

interface Props {
  authors: Authors[];
}

const Searchauthors: React.FC<Props> = ({ authors }) => {
  return (
    <Table<Authors>
      heading="Search Results"
      tableHeadings={["First Name", "Last Name", "Nationality", "Birth Date"]}
      tableBodyData={authors}
      renderRow={(authors) => (
        <>
          <td>{authors.first_name}</td>
          <td>{authors.last_name}</td>
          <td>{authors.nationality}</td>
          <td>{new Date(authors.birthdate).toDateString()}</td>
        </>
      )}
    />
  );
};
export default Searchauthors;

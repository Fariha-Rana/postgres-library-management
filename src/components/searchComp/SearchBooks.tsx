import Table from "@/components/Table";
import { Books } from "@/database/utils/type";

interface Props {
  books: Books[];
}
const SearchBooks: React.FC<Props> = ({ books }) => {
  return (
    <Table<Books>
      heading="Book List"
      tableHeadings={[
        "Book ID",
        "Title",
        "Author Name",
        "Genre",
        "Published Date",
        "ISBN",
        "Available Copies",
      ]}
      tableBodyData={books}
      renderRow={(books) => (
        <>
          <td>{books.book_id}</td>
          <td>{books.title}</td>
          <td>{books.author_name}</td>
          <td>{books.genre}</td>
          <td>{new Date(books.publish_date).toDateString()}</td>
          <td>{books.isbn}</td>
          <td>{books.available_copies}</td>
        </>
      )}
    />
  );
};

export default SearchBooks;

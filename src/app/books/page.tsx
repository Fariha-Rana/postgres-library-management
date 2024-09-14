import ResponseMessage from "@/components/ResponseMessage";
import Table from "@/components/Table";
import dbConnection from "@/database/connection";
import { Books } from "@/database/utils/type";

const BooksPage = async () => {
  const res = await dbConnection.query(
    `SELECT b.book_id, b.title, b.genre, b.publish_date, b.isbn,b.available_copies, a.first_name || ' ' || a.last_name as author_name FROM Books b JOIN Authors a ON b.author_id = a.author_id order by book_id desc;`
  );
  const books = res?.rows || [];
  if (books.length === 0) return <ResponseMessage message="No Books Found" />;

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

export default BooksPage;

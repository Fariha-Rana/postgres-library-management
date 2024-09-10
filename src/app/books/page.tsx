import Table from "@/components/Table";
import dbConnection from "@/database/connection";

interface Books {
  book_id: number;
  title: string;
  author_id: number;
  genre: string;
  publish_date: string;
  isbn: number;
  available_copies: number;
}

const BooksPage = async () => {
  const res = await dbConnection.query("SELECT * FROM Books");
  const books = res?.rows;

  if (!books) return <p>No books found</p>;

  return (
    <Table<Books>
      heading="Book List"
      tableHeadings={[
        "Book ID",
        "Title",
        "Author ID",
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
          <td>{books.author_id}</td>
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

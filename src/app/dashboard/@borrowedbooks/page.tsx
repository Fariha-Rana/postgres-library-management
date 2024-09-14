import Table from "@/components/Table";
import db from "@/database/connection";
import asyncHandler from "@/database/utils/asyncHandler";

interface BorrowedBooks {
  transaction_id: number;
  title: string;
  member_name: string;
  borrow_date: string;
  due_date: string;
  return_date: string;
}

const borrowedBooksQuery = `
  SELECT 
    t.transaction_id,
    b.title,
    m.first_name || ' ' || m.last_name AS member_name,
    t.borrow_date,
    t.due_date
  FROM Transactions t
  JOIN Books b ON t.book_id = b.book_id
  JOIN Members m ON t.member_id = m.member_id
  WHERE t.return_date IS NULL OR t.return_date > t.due_date
  ORDER BY t.transaction_id DESC;
`;

async function Page() {
  const res = await asyncHandler(() => db.query(borrowedBooksQuery));
  const booksBorrowed = res?.rows;

  return (
    <Table<BorrowedBooks>
      heading="Books Currently Borrowed"
      tableHeadings={[
        "Tx Id",
        "Title",
        "Member Name",
        "Borrow Date",
        "Due Date",
      ]}
      tableBodyData={booksBorrowed}
      renderRow={(book) => (
        <>
          <td>{book.transaction_id}</td>
          <td>{book.title}</td>
          <td>{book.member_name}</td>
          <td>{new Date(book.borrow_date).toDateString()}</td>
          <td>{new Date(book.due_date).toDateString()}</td>
        </>
      )}
    />
  );
}

export default Page;

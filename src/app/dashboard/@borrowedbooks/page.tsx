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
    CASE 
      WHEN t.return_date IS NULL THEN 'Not Returned'
      ELSE t.return_date::text
    END AS return_date,
    t.due_date
  FROM Transactions t
  JOIN Books b ON t.book_id = b.book_id
  JOIN Members m ON t.member_id = m.member_id
  WHERE t.return_date IS NULL OR t.return_date > t.due_date;
`;

async function Page() {
  const booksBorrowed = await asyncHandler(() => db.query(borrowedBooksQuery));
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Table<BorrowedBooks>
        heading="Books Currently Borrowed"
        tableHeadings={[
          "Title",
          "Member Name",
          "Borrow Date",
          "Due Date",
          "Return Date",
        ]}
        tableBodyData={booksBorrowed}
        renderRow={(book) => (
          <>
            <td>{book.title}</td>
            <td>{book.member_name}</td>
            <td>{new Date(book.borrow_date).toDateString()}</td>
            <td>{new Date(book.due_date).toDateString()}</td>
            <td>
              {book.return_date
                ? new Date(book.return_date).toDateString()
                : "Not Returned"}
            </td>
          </>
        )}
      />
    </div>
  );
}

export default Page;

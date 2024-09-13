import Table from "@/components/Table";
import db from "@/database/connection";
import asyncHandler from "@/database/utils/asyncHandler";

interface OverdueBooks {
  member_id: number;
  member_name: string;
  book_title: string;
  borrow_date: string;
  due_date: string;
  overdue_days: string;
  fine_amount: number;
}

export default async function Page() {
  const overdueBooks = await asyncHandler(() =>
    db.query(membersWithOverdueBooksQuery)
  );

  if (overdueBooks.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">Overdue Books</h1>
        <p>No overdue books found.</p>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Table<OverdueBooks>
        heading="  Members with Overdue Books"
        tableHeadings={[
          "Borrower Id",
          "Borrower Name",
          "Book Title",
          "Borrow Date",
          "Due Date",
          "Overdue Days",
          "Fine Amount",
        ]}
        tableBodyData={overdueBooks}
        renderRow={(book) => (
          <>
            <td>{book.member_id}</td>
            <td>{book.member_name}</td>
            <td>{book.book_title}</td>
            <td>{new Date(book.borrow_date).toDateString()}</td>
            <td>{new Date(book.due_date).toDateString()}</td>
            <td>{book.overdue_days}</td>
            <td>${book.fine_amount}</td>
          </>
        )}
      />
    </div>
  );
}

const membersWithOverdueBooksQuery = `
  SELECT
    m.member_id,
    m.first_name || ' ' || m.last_name AS member_name,
    b.title AS book_title,
    t.borrow_date,
    t.due_date::DATE as due_date,
    CURRENT_DATE - due_date AS overdue_days,
    (CURRENT_DATE - due_date) * 1 AS fine_amount
    FROM Transactions t
   JOIN Members m ON t.member_id = m.member_id
   JOIN Books b ON t.book_id = b.book_id
   WHERE t.return_date IS NULL AND t.due_date::TIMESTAMP < CURRENT_DATE::TIMESTAMP
   ORDER BY borrow_date DESC;
`;

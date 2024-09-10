import Table from "@/components/Table";
import db from "@/database/connection";
import asyncHandler from "@/database/utils/asyncHandler";

interface OverdueBooks {
  book_title: string;
  member_name: string;
  book_id: number;
  due_date: string;
  return_date: string;
  overdue_days: string;
}
export default async function Page() {
  const overdueBooks = await asyncHandler(() =>
    db.query(membersWithOverdueBooksQuery)
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Table<OverdueBooks>
        heading="  Members with Overdue Books"
        tableHeadings={[
          "Book Title",
          "Borrower Name",
          "Due Date",
          "Return Date",
          "Overdue Days",
        ]}
        tableBodyData={overdueBooks}
        renderRow={(book) => (
          <>
            <td>{book.book_title}</td>
            <td>{book.member_name}</td>
            <td>{new Date(book.due_date).toDateString()}</td>
            <td>{new Date(book.return_date).toLocaleDateString()}</td>
            <td>{new Date(book.overdue_days).toDateString()}</td>
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
        t.due_date,
        COALESCE(t.return_date, CURRENT_DATE) AS return_date,
        GREATEST(0, COALESCE(t.return_date, CURRENT_DATE) - t.due_date) AS overdue_days
      FROM Transactions t
      JOIN Members m ON t.member_id = m.member_id
      JOIN Books b ON t.book_id = b.book_id
      WHERE t.return_date IS NULL OR t.return_date > t.due_date;
    `;

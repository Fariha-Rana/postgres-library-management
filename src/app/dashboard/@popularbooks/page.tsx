import Table from "@/components/Table";
import db from "@/database/connection";
import asyncHandler from "@/database/utils/asyncHandler";

interface PopularBooks {
  title: string;
  borrow_count: number;
}

const mostPopularBooksQuery = `
        SELECT 
        b.book_id,
        b.title,
        COUNT(t.transaction_id) AS borrow_count
      FROM Transactions t
      JOIN Books b ON t.book_id = b.book_id
      GROUP BY b.book_id, b.title
      ORDER BY borrow_count DESC;`;

async function Page() {
  const popularBooks = await asyncHandler(() =>
    db.query(mostPopularBooksQuery)
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Table<PopularBooks>
        heading="Most Popular Books"
        tableHeadings={["Title", "Borrow Count"]}
        tableBodyData={popularBooks}
        renderRow={(book) => (
          <>
            <td>{book.title}</td>
            <td>{book.borrow_count}</td>
          </>
        )}
      />
    </div>
  );
}

export default Page;

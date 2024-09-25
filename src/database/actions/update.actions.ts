"use server";
import dbConnection from "@/database/connection";
;
export const updateBook = async (bookId: number, formData: FormData) => {
  const { title, authorId, genre, publishDate, isbn, availableCopies } =
    Object.fromEntries(formData);
  try {
    await dbConnection.query(
      "UPDATE Books SET title = $1, author_id = $2, genre = $3, publish_date = $4, isbn = $5, available_copies = $6 WHERE book_id = $7",
      [title, authorId, genre, publishDate, isbn, availableCopies, bookId]
    );
  } catch (error) {
    console.error("Error updating book:", error);
  }
};

export const updateAuthor = async (authorId: number, formData: FormData) => {
  const { firstName, lastName, birthdate, nationality } =
    Object.fromEntries(formData);
  try {
    await dbConnection.query(
      "UPDATE Authors SET first_name = $1, last_name = $2, birthdate = $3, nationality = $4 WHERE author_id = $5",
      [firstName, lastName, birthdate, nationality, authorId]
    );
  } catch (error) {
    console.error("Error updating Author:", error);
  }
};

export const updateMember = async (memberId: number, formData: FormData) => {
  const { firstName, lastName, email, phone, registrationDate } =
    Object.fromEntries(formData);
  try {
     await dbConnection.query(
      "UPDATE Members SET first_name = $1, last_name = $2, email = $3, phone = $4, registration_date = $5 WHERE member_id = $6 RETURNING member_id",
      [firstName, lastName, email, phone, registrationDate, memberId]
    );
  } catch (error) {
    console.error("Error updating Member:", error);
  }
};

export const updateTransaction = async (
  transactionId: number,
  formData: FormData
) => {
  const { memberId, bookId, borrowDate, returnDate, dueDate } =
    Object.fromEntries(formData);
  try {
       await dbConnection.query(
      "UPDATE Transactions SET member_id = $1, book_id = $2, borrow_date = $3, return_date = $4, due_date = $5 WHERE transaction_id = $6",
      [memberId, bookId, borrowDate, returnDate, dueDate, transactionId]
    );
  } catch (error) {
    console.log("Error updating Transaction:", error);
  }
};

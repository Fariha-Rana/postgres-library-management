"use server";
import dbConnection from "@/database/connection";
import asyncHandler from "../utils/asyncHandler";

export async function addAuthors(Formdata: FormData) {
  console.log("add authors running in server action");
  const { firstName, lastName, birthdate, nationality } =
    Object.fromEntries(Formdata);

  const result = await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Authors (first_name, last_name, birthdate, nationality) VALUES ($1, $2, $3, $4) RETURNING author_id",
      [firstName, lastName, birthdate, nationality]
    )
  );

  if (result.errorMessage) return { errorMessage: result.errorMessage };
  return {
    successMessage: "Added successfully",
  };
}

export async function addBooks(Formdata: FormData) {
  console.log("add books running in server action");
  const { title, authorId, genre, publishDate, isbn, availableCopies } =
    Object.fromEntries(Formdata);

  const result = await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Books (title, author_id, genre, publish_date, isbn, available_copies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING book_id",
      [title, authorId, genre, publishDate, isbn, availableCopies]
    )
  );
  if (result.errorMessage) return { errorMessage: result.errorMessage };
  return {
    successMessage: "Added successfully",
  };
}

export async function addMembers(Formdata: FormData) {
  console.log("add members running in server action");
  const { firstName, lastName, email, phone, registrationDate } =
    Object.fromEntries(Formdata);

  const result = await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Members (first_name, last_name, email, phone, registration_date) VALUES ($1, $2, $3, $4, $5) RETURNING member_id",
      [firstName, lastName, email, phone, registrationDate]
    )
  );
  if (result.errorMessage) return { errorMessage: result.errorMessage };
  return {
    successMessage: "Added successfully",
  };
}

export async function addTransactions(Formdata: FormData) {
  console.log("add transactions running in server action");
  const { memberId, bookId, borrowDate, dueDate } =
    Object.fromEntries(Formdata);

  const result = await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Transactions (member_id, book_id, borrow_date, return_date, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING transaction_id",
      [memberId, bookId, borrowDate, null, dueDate]
    )
  );

  if (result.errorMessage) return { errorMessage: result.errorMessage };
  return {
    successMessage: "Added successfully",
  };
}

"use server";
import dbConnection from "@/database/connection";
import { revalidatePath } from "next/cache";
import asyncHandler from "../utils/asyncHandler";

export async function addAuthors(Formdata: FormData) {
  const { firstName, lastName, birthdate, nationality } =
    Object.fromEntries(Formdata);

  await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Authors (first_name, last_name, birthdate, nationality) VALUES ($1, $2, $3, $4) RETURNING author_id",
      [firstName, lastName, birthdate, nationality]
    )
  );
  revalidatePath("/authors");
}

export async function addBooks(Formdata: FormData) {
  const { title, authorId, genre, publishDate, isbn, availableCopies } =
    Object.fromEntries(Formdata);

  await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Books (title, author_id, genre, publish_date, isbn, available_copies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING book_id",
      [title, authorId, genre, publishDate, isbn, availableCopies]
    )
  );
  revalidatePath("/books");
}

export async function addMembers(Formdata: FormData) {
  const { firstName, lastName, email, phone, registrationDate } =
    Object.fromEntries(Formdata);

  await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Members (first_name, last_name, email, phone, registration_date) VALUES ($1, $2, $3, $4, $5) RETURNING member_id",
      [firstName, lastName, email, phone, registrationDate]
    )
  );
  revalidatePath("/members");
}

export async function addTransactions(Formdata: FormData) {
  const { memberId, bookId, borrowDate, dueDate } =
    Object.fromEntries(Formdata);

  await asyncHandler(() =>
    dbConnection.query(
      "INSERT INTO Transactions (member_id, book_id, borrow_date, return_date, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING transaction_id",
      [memberId, bookId, borrowDate, null, dueDate]
    )
  );
  revalidatePath("/transactions");
}

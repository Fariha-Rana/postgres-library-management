"use server";

import dbConnection from "@/database/connection";
import { revalidatePath } from "next/cache";

export async function addAuthors(Formdata: FormData) {
  const { firstName, lastName, birthdate, nationality } =
    Object.fromEntries(Formdata);

  try {
    const res = await dbConnection.query(
      "INSERT INTO Authors (first_name, last_name, birthdate, nationality) VALUES ($1, $2, $3, $4) RETURNING author_id",
      [firstName, lastName, birthdate, nationality]
    );
    console.log("addAuthors response", res.rows[0]);
  } catch (error: unknown) {
    console.log("addAuthors error", error);
    // throw new Error("Database error" + (error as Error)?.message);
  }
  revalidatePath("/authors");
}

export async function addBooks(Formdata: FormData) {
  const { title, authorId, genre, publishDate, isbn, availableCopies } =
    Object.fromEntries(Formdata);

  try {
    const res = await dbConnection.query(
      "INSERT INTO Books (title, author_id, genre, publish_date, isbn, available_copies) VALUES ($1, $2, $3, $4, $5, $6) RETURNING book_id",
      [title, authorId, genre, publishDate, isbn, availableCopies]
    );
    console.log("addBooks response", res.rows[0]);
  } catch (error: unknown) {
    console.log("addBooks error", error);
    // throw new Error("Database error" + (error as Error)?.message);
  }
  revalidatePath("/books");
}

export async function addMembers(Formdata: FormData) {
  const { firstName, lastName, email, phone, registrationDate } =
    Object.fromEntries(Formdata);
  try {
    const res = await dbConnection.query(
      "INSERT INTO Members (first_name, last_name, email, phone, registration_date) VALUES ($1, $2, $3, $4, $5) RETURNING member_id",
      [firstName, lastName, email, phone, registrationDate]
    );
    console.log("addMembers response", res.rows[0]);
    revalidatePath("/members");
  } catch (error: unknown) {
    console.log("addmembers error", error);
    // throw new Error("Database error" + (error as Error)?.message);
  }
}

export async function addTransactions(Formdata: FormData) {
  const { memberId, bookId, borrowDate, dueDate } =
    Object.fromEntries(Formdata);
  try {
    const res = await dbConnection.query(
      "INSERT INTO Transactions (member_id, book_id, borrow_date, return_date, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING transaction_id",
      [memberId, bookId, borrowDate, null, dueDate]
    );
    console.log("addTransactions response", res.rows[0]);
    revalidatePath("/transactions");
  } catch (error: unknown) {
    console.log("addMTransaction error", error);
    // throw new Error("Database error" + (error as Error)?.message);
  }
}

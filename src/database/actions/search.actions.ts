"use server";
import dbConnection from "@/database/connection";

export async function searchQueryFromDatabase(
  table_name: string,
  searchText: string
) {
  console.log("Searching for books in server actions:", searchText);
  try {
    const text = `SELECT * FROM search_${table_name}($1)`;
    const result = await dbConnection.query(text, [searchText]);
    return result.rows;
  } catch (error) {
    console.error("Error Searching books", error);
    return [];
  }
}

"use server";
import dbConnection from "@/database/connection";
import asyncHandler from "../utils/asyncHandler";

export async function searchQueryFromDatabase(
  table_name: string,
  searchText: string
) {
  return await asyncHandler(() => {
    return dbConnection.query(`SELECT * FROM search_${table_name}($1);`, [
      searchText,
    ]);
  });
}

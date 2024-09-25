"use server";
import dbConnection from "@/database/connection";
import asyncHandler from "../utils/asyncHandler";

export async function deleteRow(
  table_name: string,
  IdName: string,
  formData: FormData
) {
  const { id } = Object.fromEntries(formData);
  const result = await asyncHandler(() =>
    dbConnection.query(`DELETE FROM ${table_name} WHERE ${IdName}_id = ($1);`, [
      id,
    ])
  );
  console.log(result);
  if (result.errorMessage) return { errorMessage: result.errorMessage };
  return {
    successMessage: "Deleted successfully",
  };
}

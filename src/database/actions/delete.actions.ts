"use server";
import dbConnection from "@/database/connection";
import asyncHandler from "../utils/asyncHandler";

export async function deleteRow(
  table_name: string,
  IdName: string,
  formData: FormData
) {
  const { id } = Object.fromEntries(formData);
  const res = await asyncHandler(() =>
    dbConnection.query(`DELETE FROM ${table_name} WHERE ${IdName}_id = ($1);`, [
      id,
    ])
  );
  console.log(res);
}

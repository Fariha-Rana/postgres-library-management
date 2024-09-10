"use server";
import dbConnection from "@/database/connection";

export async function getDataFromDatabse(command: string) {
  try {
    const res = await dbConnection.query(command);
    console.log(res);
    return res.rows;
  } catch (error: unknown) {
    throw new Error("Database error" + (error as Error)?.message);
    //    return new Response("Database error", { status: 500 });
  }
}

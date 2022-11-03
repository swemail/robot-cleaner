import { Result, ResultInput } from "../types";
import { getClient } from "./lib/db";

export const saveExecution = async (data: ResultInput): Promise<Result> => {
  const client = await getClient();

  try {
    const result = await client.query(
      "INSERT INTO executions(timestamp, commands, result, duration) VALUES($1, $2, $3, $4) RETURNING *",
      [data.timestamp, data.commands, data.result, data.duration]
    );
    return result.rows[0] as Result;
  } catch (error) {
    console.error(error);
    throw new Error("Error writing to the database");
  } finally {
    client.release();
  }
};

import { Pool } from "pg";
import config from "../../lib/config";

const { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD, DB_PORT } = config;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export const getClient = async () => {
  return pool.connect();
};

import postgres from "postgres";
import { readFile } from "node:fs/promises";
if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL in .env.local");
const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
try {
  await sql.unsafe(
    await readFile(new URL("../db/001_orders.sql", import.meta.url), "utf8"),
  );
  console.log("Order schema ready.");
} finally {
  await sql.end();
}

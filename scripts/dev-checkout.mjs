import { PGlite } from "@electric-sql/pglite";
import { createServer, LogLevel } from "pglite-server";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";
import { loadEnvFile } from "node:process";
loadEnvFile(".env.local");
if (!process.env.MOLLIE_API_KEY?.startsWith("test_"))
  throw new Error(
    "Checkout tests only accept a Mollie TEST key in .env.local.",
  );
const cloud = process.argv.includes("--cloud");
if (cloud && !process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL before using --cloud.");
await mkdir(".test-db", { recursive: true });
let secret = process.env.ORDER_TOKEN_SECRET;
if (!secret) {
  try {
    secret = await readFile(".test-db/order-secret", "utf8");
  } catch {
    secret = randomBytes(32).toString("hex");
    await writeFile(".test-db/order-secret", secret);
  }
}
let database, server;
let databaseUrl = process.env.DATABASE_URL;
if (!cloud) {
  database = new PGlite(".test-db/postgres");
  await database.waitReady;
  await database.exec(await readFile("db/001_orders.sql", "utf8"));
  server = createServer(database, { logLevel: LogLevel.Error });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  databaseUrl = `postgres://postgres@127.0.0.1:${server.address().port}/postgres?sslmode=disable`;
}
const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "dev", "-p", "3001"],
  {
    stdio: "inherit",
    windowsHide: true,
    env: {
      ...process.env,
      NODE_ENV: "development",
      CHECKOUT_LOCAL_TEST: "true",
      CHECKOUT_TEST_MODE: "true",
      CHECKOUT_ENABLED: "true",
      DATABASE_URL: databaseUrl,
      ORDER_TOKEN_SECRET: secret,
      CHECKOUT_BASE_URL: "http://localhost:3001",
      NEXT_PUBLIC_PREORDER_SHIPPING_PERIOD:
        "Testbestelling — er wordt niets verzonden",
    },
  },
);
console.log(
  `TEST checkout: http://localhost:3001/bestellen — database: ${cloud ? "configured Supabase/PostgreSQL" : "local .test-db"}. No real money, shipping or emails.`,
);
child.on("exit", async (code) => {
  server?.close();
  await database?.close();
  process.exitCode = code || 0;
});
process.on("SIGINT", () => child.kill("SIGINT"));

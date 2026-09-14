// Creates one unpaid TEST payment with fictitious data. Never uses a live key.
import { loadEnvFile } from "node:process";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import postgres from "postgres";
loadEnvFile(".env.local");
if (
  !process.env.MOLLIE_API_KEY?.startsWith("test_") ||
  !process.env.DATABASE_URL
)
  throw new Error("Test key and database required.");
const input = {
  requestId: randomUUID(),
  name: "Testbestelling geen verzending",
  email: "checkout-test@example.com",
  street: "Teststraat 12",
  postalCode: "1234 AB",
  city: "Amsterdam",
  country: "NL",
  quantity: 1,
  format: "paperback",
  termsAccepted: true,
};
const responses = await Promise.all(
  Array.from({ length: 3 }, async () => {
    const response = await fetch("http://localhost:3001/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3001",
      },
      body: JSON.stringify(input),
      signal: AbortSignal.timeout(60000),
    });
    const body = await response.json();
    if (!response.ok)
      throw new Error(`Checkout HTTP ${response.status}: ${body.error}`);
    return body;
  }),
);
const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
try {
  const orders =
    await sql`SELECT id, payment_id, amount_total, payment_mode, payment_status FROM bookshop.orders WHERE request_id = ${input.requestId}`;
  if (orders.length !== 1 || new Set(responses.map((r) => r.url)).size !== 1)
    throw new Error("Duplicate order or checkout detected.");
  const paymentResponse = await fetch(
    `https://api.mollie.com/v2/payments/${orders[0].payment_id}`,
    { headers: { Authorization: `Bearer ${process.env.MOLLIE_API_KEY}` } },
  );
  if (!paymentResponse.ok)
    throw new Error(`Mollie HTTP ${paymentResponse.status}`);
  const payment = await paymentResponse.json();
  if (
    payment.mode !== "test" ||
    payment.metadata.orderId !== orders[0].id ||
    payment.amount.value !== (orders[0].amount_total / 100).toFixed(2)
  )
    throw new Error("Provider mismatch.");
  await mkdir("artifacts", { recursive: true });
  // Return URL contains the secret order access token, so store only in ignored artifacts.
  await writeFile(
    "artifacts/mollie-supabase-smoke.json",
    JSON.stringify(
      {
        orderId: orders[0].id,
        paymentId: payment.id,
        checkoutUrl: responses[0].url,
        returnUrl: payment.redirectUrl,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({
      simultaneousRequests: 3,
      ordersStored: orders.length,
      sameCheckout: true,
      amount: payment.amount.value,
      currency: payment.amount.currency,
      mode: payment.mode,
      status: payment.status,
      database: "configured PostgreSQL/Supabase",
    }),
  );
} finally {
  await sql.end();
}

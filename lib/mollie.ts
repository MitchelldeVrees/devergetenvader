import "server-only";
import type { Payment } from "./checkout-validation";
export async function mollie(
  path: string,
  body?: unknown,
  idempotencyKey?: string,
): Promise<Payment> {
  const response = await fetch(`https://api.mollie.com/v2/payments${path}`, {
    method: body ? "POST" : "GET",
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
    headers: {
      Authorization: `Bearer ${process.env.MOLLIE_API_KEY}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  if (!response.ok) throw new Error(`Payment provider HTTP ${response.status}`);
  return response.json();
}

import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { sendConfirmation, syncPayment } from "@/lib/orders";
export const runtime = "nodejs";
export const maxDuration = 120;
export async function GET(request: Request) {
  const expected = Buffer.from(`Bearer ${process.env.CRON_SECRET || ""}`);
  const received = Buffer.from(request.headers.get("authorization") || "");
  if (
    !process.env.CRON_SECRET ||
    received.length !== expected.length ||
    !timingSafeEqual(received, expected)
  )
    return new NextResponse(null, { status: 401 });
  const orders =
    await db()`SELECT id, payment_id, payment_status, created_at FROM bookshop.orders WHERE payment_mode = ${process.env.MOLLIE_API_KEY?.startsWith("live_") ? "live" : "test"} AND ((payment_status IN ('created', 'open', 'pending', 'authorized') AND created_at > now() - interval '7 days') OR (payment_status = 'paid' AND email_sent_at IS NULL)) ORDER BY (payment_status = 'paid') DESC, COALESCE(last_checked_at, created_at) LIMIT 50`;
  let failures = 0;
  let checked = 0;
  const started = Date.now();
  for (const order of orders) {
    if (Date.now() - started > 60000) break;
    checked++;
    try {
      if (order.payment_id && order.payment_status !== "paid")
        await syncPayment(order.payment_id);
      await sendConfirmation(order.id);
      if (
        !order.payment_id &&
        Date.now() - new Date(order.created_at).getTime() > 50 * 60000
      )
        failures++;
    } catch {
      failures++;
    } finally {
      await db()`UPDATE bookshop.orders SET last_checked_at = now() WHERE id = ${order.id}`;
    }
  }
  await db()`DELETE FROM bookshop.rate_limits WHERE expires_at < now()`;
  return NextResponse.json(
    { checked, failures },
    { status: failures ? 503 : 200 },
  );
}

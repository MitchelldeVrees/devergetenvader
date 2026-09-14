import { NextResponse } from "next/server";
import { sendConfirmation, syncPayment } from "@/lib/orders";
export const runtime = "nodejs";
export async function POST(request: Request) {
  const body = await request.text();
  if (body.length > 1000) return new NextResponse(null, { status: 413 });
  const id = new URLSearchParams(body).get("id");
  if (!id || !/^tr_[A-Za-z0-9]+$/.test(id))
    return new NextResponse(null, { status: 400 });
  try {
    const orderId = await syncPayment(id);
    if (orderId) await sendConfirmation(orderId);
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    // Non-200 asks Mollie to retry; log only the safe, generic error message —
    // never buyer data, tokens or the raw provider response.
    console.error(
      "[webhook] Payment or email reconciliation failed:",
      error instanceof Error ? error.message : error,
    );
    return new NextResponse(null, { status: 503 });
  }
}

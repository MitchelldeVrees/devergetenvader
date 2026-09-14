import { NextResponse } from "next/server";
import { orderByToken, syncPayment } from "@/lib/orders";
export const runtime = "nodejs";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token =
    request.headers.get("authorization")?.replace(/^Bearer /, "") || "";
  try {
    const { id } = await params;
    let order = await orderByToken(id, token);
    if (!order)
      return NextResponse.json(
        { error: "Bestelling niet gevonden." },
        { status: 404 },
      );
    if (order.payment_id && order.payment_status !== "paid") {
      await syncPayment(order.payment_id);
      order = (await orderByToken(id, token))!;
    }
    return NextResponse.json(
      {
        id: order.id,
        status: order.payment_status,
        amount: order.amount_paid,
        quantity: order.quantity,
        unitPrice: order.unit_price,
        expectedShippingPeriod: order.expected_shipping_period,
        testMode: order.payment_mode === "test",
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
          "Referrer-Policy": "no-referrer",
        },
      },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "We kunnen je betaalstatus nu niet controleren. Je hoeft niet opnieuw te betalen.",
      },
      { status: 503 },
    );
  }
}

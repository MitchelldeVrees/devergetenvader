import "server-only";
import { createHash, createHmac, randomUUID } from "node:crypto";
import { db } from "./db";
import { book, money } from "./site";
import {
  calculateTotal,
  canRetryCreation,
  validPayment,
  type CheckoutInput,
} from "./checkout-validation";
import {
  checkoutOrigin,
  checkoutTestMode,
  localCheckoutTestMode,
} from "./checkout-config";
import { mollie } from "./mollie";
import { Resend } from "resend";

export type Order = {
  id: string;
  request_id: string;
  input_hash: string;
  name: string;
  email: string;
  shipping_address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  quantity: number;
  format: string;
  unit_price: number;
  shipping_cost: number;
  amount_total: number;
  amount_paid: number;
  payment_id: string | null;
  payment_mode: string;
  payment_status: string;
  checkout_url: string | null;
  payment_request: Record<string, unknown>;
  expected_shipping_period: string;
  created_at: Date;
  email_payload: {
    from: string;
    to: string;
    replyTo: string;
    subject: string;
    text: string;
    html: string;
  } | null;
  email_first_attempt_at: Date | null;
  email_sent_at: Date | null;
};
export const hash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
function confirmationHtml(order: {
  id: string;
  name: string;
  quantity: number;
  unit_price: number;
  shipping_cost: number;
  amount_total: number;
  expected_shipping_period: string;
  shipping_address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
}) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#2e3a6399;">${label}</td><td style="padding:6px 0;text-align:right;">${value}</td></tr>`;
  return `<!doctype html>
<html lang="nl">
  <body style="margin:0;padding:0;background:#f6f1e7;font-family:Georgia,'Times New Roman',serif;color:#2e3a63;">
    <div style="max-width:480px;margin:0 auto;padding:32px 24px;">
      <p style="font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#982818;margin:0 0 8px;">${escapeHtml(book.title)}</p>
      <h1 style="font-size:22px;margin:0 0 16px;color:#2e3a63;">Je pre-order is bevestigd</h1>
      <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">Hallo ${escapeHtml(order.name)},<br>Je betaling is ontvangen. Je pre-order staat klaar voor de eerste oplage.</p>
      <table role="presentation" width="100%" style="border-collapse:collapse;font-size:14px;margin:0 0 20px;">
        ${row("Bestelnummer", escapeHtml(order.id))}
        ${row("Aantal", `${order.quantity} × ${escapeHtml(book.title)} (paperback)`)}
        ${row("Prijs per stuk", money(order.unit_price))}
        ${row("Verzending", money(order.shipping_cost))}
        <tr><td style="padding:10px 0;font-weight:bold;border-top:1px solid #2e3a6330;">Betaald</td><td style="padding:10px 0;font-weight:bold;text-align:right;border-top:1px solid #2e3a6330;">${money(order.amount_total)}</td></tr>
      </table>
      <p style="font-size:14px;line-height:1.6;margin:0 0 20px;">Verwachte verzending: ${escapeHtml(order.expected_shipping_period)}</p>
      <p style="font-size:14px;line-height:1.6;margin:0 0 4px;color:#2e3a6399;">Bezorgadres</p>
      <p style="font-size:14px;line-height:1.6;margin:0 0 20px;">${escapeHtml(order.name)}<br>${escapeHtml(order.shipping_address.street)}<br>${escapeHtml(order.shipping_address.postalCode)} ${escapeHtml(order.shipping_address.city)}<br>${escapeHtml(order.shipping_address.country)}</p>
      <p style="font-size:13px;line-height:1.6;color:#2e3a6399;margin:0 0 20px;">Dit is een pre-order: je hebt nu betaald, het boek wordt later verzonden. Vragen of annuleren? Mail <a href="mailto:${book.email}" style="color:#982818;">${book.email}</a> met je bestelnummer.<br>Voorwaarden: <a href="${book.canonicalDomain}/algemene-voorwaarden" style="color:#982818;">${book.canonicalDomain}/algemene-voorwaarden</a></p>
      <p style="font-size:14px;margin:24px 0 0;">Bedankt,<br>${escapeHtml(book.author)}</p>
    </div>
  </body>
</html>`;
}
const tokenFor = (requestId: string) =>
  createHmac("sha256", process.env.ORDER_TOKEN_SECRET!)
    .update(requestId)
    .digest("hex");

async function createMolliePayment(order: Order) {
  try {
    return await mollie("", order.payment_request, order.request_id);
  } catch (error) {
    // Mollie occasionally reports our idempotency key as already used with
    // different parameters (seen when the same key was sent under a
    // different API key/mode outside our own retry logic). A 400 here means
    // Mollie created nothing for this attempt, so retrying once with a
    // fresh key is safe -- validPayment() still verifies the result matches
    // this exact order before we ever trust it.
    if (error instanceof Error && /idempotency key/i.test(error.message))
      return mollie("", order.payment_request, `${order.request_id}:retry`);
    throw error;
  }
}
export async function createCheckout(input: CheckoutInput) {
  const sql = db();
  const inputHash = hash(JSON.stringify(input));
  const token = tokenFor(input.requestId);
  const id = randomUUID();
  const address = {
    street: input.street,
    postalCode: input.postalCode,
    city: input.city,
    country: input.country,
  };
  const paymentRequest = {
    amount: {
      currency: "EUR",
      value: (calculateTotal(input.quantity) / 100).toFixed(2),
    },
    description: `${book.title} · pre-order ${id}`,
    redirectUrl: `${checkoutOrigin()}/bestelling/${id}?token=${token}`,
    // Local test payments are confirmed by authenticated polling after return.
    // A public production deployment always registers the webhook.
    ...(!localCheckoutTestMode()
      ? { webhookUrl: `${checkoutOrigin()}/api/payments/webhook` }
      : {}),
    method: ["ideal"],
    locale: "nl_NL",
    metadata: { orderId: id },
  };
  // Commit the attempt BEFORE contacting Mollie; survives a process crash or timeout.
  await sql`INSERT INTO bookshop.orders (id, request_id, input_hash, token_hash, name, email, shipping_address, quantity, format, unit_price, shipping_cost, amount_total, payment_mode, payment_request, expected_shipping_period, terms_version)
    VALUES (${id}, ${input.requestId}, ${inputHash}, ${hash(token)}, ${input.name}, ${input.email}, ${sql.json(address)}, ${input.quantity}, ${input.format}, ${book.paperbackPrice}, ${book.shipping.price}, ${calculateTotal(input.quantity)}, ${process.env.MOLLIE_API_KEY!.startsWith("live_") ? "live" : "test"}, ${sql.json(paymentRequest)}, ${book.expectedShippingPeriod}, ${process.env.TERMS_VERSION || "2026-09-14"}) ON CONFLICT (request_id) DO NOTHING`;
  return sql.begin(async (tx) => {
    const [order] = await tx<
      Order[]
    >`SELECT * FROM bookshop.orders WHERE request_id = ${input.requestId} FOR UPDATE`;
    if (order.input_hash !== inputHash) throw new Error("REQUEST_CONFLICT");
    if (
      order.payment_mode !==
      (process.env.MOLLIE_API_KEY!.startsWith("live_") ? "live" : "test")
    )
      throw new Error("REQUEST_CONFLICT");
    if (order.checkout_url)
      return {
        url:
          order.payment_status === "paid"
            ? `${checkoutOrigin()}/bestelling/${order.id}?token=${token}`
            : order.checkout_url,
      };
    if (!canRetryCreation(order.created_at))
      throw new Error("RECONCILIATION_REQUIRED");
    const payment = await createMolliePayment(order);
    if (!validPayment(payment, { ...order, payment_id: payment.id }))
      throw new Error("Payment mismatch");
    const url = payment._links?.checkout?.href;
    if (
      !url ||
      new URL(url).protocol !== "https:" ||
      !(
        new URL(url).hostname === "mollie.com" ||
        new URL(url).hostname.endsWith(".mollie.com")
      )
    )
      throw new Error("Invalid checkout URL");
    await tx`UPDATE bookshop.orders SET payment_id = ${payment.id}, checkout_url = ${url}, payment_status = ${payment.status} WHERE id = ${order.id}`;
    return { url };
  });
}

export async function orderByToken(
  id: string,
  token: string,
): Promise<Order | null> {
  if (!/^[0-9a-f-]{36}$/.test(id) || !/^[0-9a-f]{64}$/.test(token)) return null;
  const [order] = await db()<
    Order[]
  >`SELECT * FROM bookshop.orders WHERE id = ${id} AND token_hash = ${hash(token)}`;
  return order || null;
}

export async function syncPayment(paymentId: string) {
  if (!/^tr_[A-Za-z0-9]+$/.test(paymentId))
    throw new Error("Invalid payment ID");
  // A webhook body is a notification, never proof of payment. Fetch with our secret key.
  return db().begin(async (tx) => {
    let payment = await mollie(`/${paymentId}`);
    if (
      !payment.metadata?.orderId ||
      !/^[0-9a-f-]{36}$/.test(payment.metadata.orderId)
    )
      return null;
    const [order] = await tx<
      Order[]
    >`SELECT * FROM bookshop.orders WHERE id = ${payment.metadata.orderId} FOR UPDATE`;
    if (!order) return null;
    payment = await mollie(`/${paymentId}`);
    if (
      !validPayment(payment, {
        ...order,
        payment_id: order.payment_id || paymentId,
      })
    )
      throw new Error("Payment mismatch");
    // Fetch inside the lock so concurrent notifications cannot overwrite newer state.
    // Paid orders are never downgraded by a delayed open/expired notification.
    const paid = payment.status === "paid";
    if (order.payment_status !== "paid" || paid) {
      const emailPayload = paid
        ? {
            from: process.env.RESEND_FROM_EMAIL!,
            to: order.email,
            replyTo: book.email,
            subject: `Je pre-order van ${book.title} is bevestigd`,
            text: `Hallo ${order.name},\n\nJe betaling is ontvangen. Je pre-order staat klaar voor de eerste oplage.\n\nBestelnummer: ${order.id}\n${order.quantity} × ${book.title} (paperback) à ${money(order.unit_price)}\nVerzending: ${money(order.shipping_cost)}\nBetaald: ${money(order.amount_total)}\nVerwachte verzending: ${order.expected_shipping_period}\n\nBezorgadres:\n${order.name}\n${order.shipping_address.street}\n${order.shipping_address.postalCode} ${order.shipping_address.city}\n${order.shipping_address.country}\n\nDit is een pre-order: je hebt nu betaald, het boek wordt later verzonden.\nVragen of annuleren? Mail ${book.email} met je bestelnummer.\nVoorwaarden: ${book.canonicalDomain}/algemene-voorwaarden\n\nBedankt,\n${book.author}`,
            html: confirmationHtml(order),
          }
        : null;
      await tx`UPDATE bookshop.orders SET payment_id = ${paymentId}, payment_status = ${payment.status}, amount_paid = ${paid ? order.amount_total : 0}, preorder_status = ${paid ? "reserved" : "awaiting_payment"}, paid_at = ${paid ? new Date(payment.paidAt || Date.now()) : null}, email_payload = COALESCE(email_payload, ${emailPayload ? tx.json(emailPayload) : null}) WHERE id = ${order.id}`;
    }
    return order.id;
  });
}

export async function sendConfirmation(id: string) {
  if (checkoutTestMode()) return; // Explicit test mode retains the email payload; never sends mail.
  const sql = db();
  // Persist first attempt outside send transaction to bound Resend's 24-hour window.
  const paymentMode = process.env.MOLLIE_API_KEY?.startsWith("live_")
    ? "live"
    : "test";
  await sql`UPDATE bookshop.orders SET email_first_attempt_at = now() WHERE id = ${id} AND payment_mode = ${paymentMode} AND payment_status = 'paid' AND email_first_attempt_at IS NULL`;
  await sql.begin(async (tx) => {
    const [order] = await tx<
      Order[]
    >`SELECT * FROM bookshop.orders WHERE id = ${id} FOR UPDATE`;
    if (
      !order ||
      order.payment_mode !== paymentMode ||
      order.payment_status !== "paid" ||
      order.email_sent_at ||
      !order.email_payload
    )
      return;
    if (
      !order.email_first_attempt_at ||
      Date.now() - new Date(order.email_first_attempt_at).getTime() >
        23 * 60 * 60 * 1000
    )
      throw new Error("EMAIL_RECONCILIATION_REQUIRED");
    const result = await new Resend(process.env.RESEND_API_KEY).emails.send(
      order.email_payload,
      { idempotencyKey: `preorder/${id}` },
    );
    if (result.error) throw new Error("Confirmation email failed");
    await tx`UPDATE bookshop.orders SET email_sent_at = now(), email_provider_id = ${result.data!.id} WHERE id = ${id}`;
  });
}

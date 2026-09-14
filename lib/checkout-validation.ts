import { z } from "zod";
export { calculateTotal } from "./pricing";
const text = z
  .string()
  .trim()
  .min(2)
  .max(150)
  .refine((v) => !/[\r\n\x00-\x1f]/.test(v));
export const checkoutInput = z
  .object({
    requestId: z.uuid(),
    name: text,
    email: z
      .email()
      .max(254)
      .transform((v) => v.toLowerCase()),
    street: text.refine((v) => /\d/.test(v), "Vul straat en huisnummer in."),
    postalCode: z
      .string()
      .trim()
      .regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/)
      .transform((v) => v.replace(/\s/g, "").toUpperCase()),
    city: text,
    country: z.literal("NL"),
    quantity: z.number().int().min(1).max(10),
    format: z.literal("paperback"),
    termsAccepted: z.literal(true),
  })
  .strict();
export type CheckoutInput = z.infer<typeof checkoutInput>;
export type Payment = {
  id: string;
  status: string;
  amount: { value: string; currency: string };
  metadata: { orderId?: string } | null;
  mode: string;
  paidAt?: string;
  _links?: { checkout?: { href: string } };
};
export function validPayment(
  payment: Payment,
  order: {
    id: string;
    amount_total: number;
    payment_mode: string;
    payment_id: string | null;
  },
) {
  return (
    payment.id === order.payment_id &&
    payment.metadata?.orderId === order.id &&
    payment.amount?.currency === "EUR" &&
    payment.amount.value === (order.amount_total / 100).toFixed(2) &&
    payment.mode === order.payment_mode
  );
}
export function canRetryCreation(createdAt: Date, now = Date.now()) {
  // Mollie only keeps idempotency keys for ONE HOUR. Never retry outside it.
  return now - new Date(createdAt).getTime() < 50 * 60 * 1000;
}

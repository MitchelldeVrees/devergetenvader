import type { Metadata } from "next";
import { OrderStatus } from "@/components/OrderStatus";
export const metadata: Metadata = {
  title: "Betaalstatus | De vergeten vader",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};
export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderStatus id={id} />;
}

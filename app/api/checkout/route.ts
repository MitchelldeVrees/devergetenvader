import { NextResponse } from "next/server";
import { checkoutInput } from "@/lib/checkout-validation";
import { checkoutReady } from "@/lib/checkout-config";
import { createCheckout } from "@/lib/orders";
import { sameOrigin, rateLimit } from "@/lib/request-security";
export const runtime = "nodejs";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Ongeldige aanvraag." }, { status: 403 });
  if (!checkoutReady())
    return NextResponse.json(
      { error: "Betalen is nog niet beschikbaar. Probeer het later opnieuw." },
      { status: 503 },
    );
  try {
    const raw = await request.text();
    if (raw.length > 6000)
      return NextResponse.json(
        { error: "Aanvraag te groot." },
        { status: 413 },
      );
    const parsed = checkoutInput.safeParse(JSON.parse(raw));
    if (!parsed.success)
      return NextResponse.json(
        {
          error:
            "Controleer je naam, e-mailadres, Nederlandse adres, aantal en akkoord met de voorwaarden.",
        },
        { status: 400 },
      );
    if (!(await rateLimit(request, "checkout", 20)))
      return NextResponse.json(
        { error: "Te veel pogingen. Probeer het over tien minuten opnieuw." },
        { status: 429 },
      );
    return NextResponse.json(await createCheckout(parsed.data));
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json(
        { error: "Ongeldige aanvraag." },
        { status: 400 },
      );
    const conflict =
      error instanceof Error && error.message === "REQUEST_CONFLICT";
    const reconcile =
      error instanceof Error && error.message === "RECONCILIATION_REQUIRED";
    console.error(
      "[checkout]",
      conflict
        ? "request conflict"
        : reconcile
          ? "reconciliation required"
          : `creation failed: ${error instanceof Error ? error.message : error}`,
    );
    return NextResponse.json(
      {
        error: conflict
          ? "Deze poging hoort bij andere gegevens. Herlaad de pagina voor een nieuwe bestelling."
          : reconcile
            ? "We controleren je eerdere betaalpoging. Neem contact op voordat je opnieuw bestelt."
            : "De betaalpagina kon niet worden geopend. Probeer opnieuw met dezelfde gegevens; je krijgt geen dubbele bestelling.",
      },
      { status: conflict || reconcile ? 409 : 502 },
    );
  }
}

"use client";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { book, money } from "@/lib/site";
import { calculateTotal } from "@/lib/pricing";
import { track } from "@/lib/analytics";
export function CheckoutForm({
  enabled,
  testMode = false,
}: {
  enabled: boolean;
  testMode?: boolean;
}) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const requestId = useRef<string | null>(null);
  const submittedBody = useRef<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !enabled) return;
    submitting.current = true;
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const fields = {
      name: form.get("name"),
      email: form.get("email"),
      street: form.get("street"),
      postalCode: form.get("postalCode"),
      city: form.get("city"),
      country: "NL",
      quantity,
      format: "paperback",
      termsAccepted: form.get("terms") === "on",
    };
    try {
      // Store only the random attempt ID and a digest, never buyer details.
      const bytes = new TextEncoder().encode(
        JSON.stringify({ ...fields, testMode }),
      );
      const digest = Array.from(
        new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)),
      )
        .map((n) => n.toString(16).padStart(2, "0"))
        .join("");
      let saved: { digest: string; id: string } | null = null;
      try {
        saved = JSON.parse(
          sessionStorage.getItem("dvv-checkout-attempt") || "null",
        );
      } catch {
        /* Storage can be disabled. */
      }
      if (!requestId.current || submittedBody.current !== digest)
        requestId.current =
          saved?.digest === digest ? saved.id : crypto.randomUUID();
      submittedBody.current = digest;
      try {
        sessionStorage.setItem(
          "dvv-checkout-attempt",
          JSON.stringify({ digest, id: requestId.current }),
        );
      } catch {
        /* In-memory retry still works. */
      }
      track("begin_checkout", {
        value: calculateTotal(quantity) / 100,
        currency: "EUR",
        items: [
          {
            item_id: book.sku,
            item_name: book.title,
            price: book.paperbackPrice / 100,
            quantity,
          },
        ],
      });
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, requestId: requestId.current }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Betalen lukt nu even niet.");
      window.location.assign(result.url);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Er ging iets mis. Probeer het opnieuw.",
      );
      submitting.current = false;
      setLoading(false);
    }
  }
  return (
    <div className="checkout-grid">
      <form
        className="checkout-form"
        onSubmit={submit}
        aria-busy={loading}
        aria-describedby={error ? "checkout-error" : undefined}
      >
        <label>
          Naam ontvanger
          <input
            name="name"
            autoComplete="shipping name"
            required
            minLength={2}
            maxLength={150}
            disabled={loading || !enabled}
          />
        </label>
        <label>
          Jouw e-mailadres
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={loading || !enabled}
          />
        </label>
        <label>
          Straat en huisnummer
          <input
            name="street"
            autoComplete="shipping address-line1"
            required
            minLength={2}
            maxLength={150}
            disabled={loading || !enabled}
          />
        </label>
        <label>
          Postcode
          <input
            name="postalCode"
            autoComplete="shipping postal-code"
            required
            pattern="[1-9][0-9]{3} ?[A-Za-z]{2}"
            placeholder="1234 AB"
            disabled={loading || !enabled}
          />
        </label>
        <label>
          Plaats
          <input
            name="city"
            autoComplete="shipping address-level2"
            required
            minLength={2}
            maxLength={150}
            disabled={loading || !enabled}
          />
        </label>
        <p>Bezorging: Nederland. Je hebt geen account nodig.</p>
        <label>
          Aantal paperbacks
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            disabled={loading || !enabled}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label className="checkbox">
          <input
            name="terms"
            type="checkbox"
            required
            disabled={loading || !enabled}
          />
          <span>
            Ik ga akkoord met de{" "}
            <Link
              prefetch={false}
              href="/algemene-voorwaarden"
              target="_blank"
              rel="noopener"
            >
              algemene voorwaarden
            </Link>{" "}
            en begrijp dat ik een pre-order plaats: ik betaal nu en ontvang het
            boek later. Lees ook de{" "}
            <Link
              prefetch={false}
              href="/privacy"
              target="_blank"
              rel="noopener"
            >
              privacyinformatie
            </Link>
            .
          </span>
        </label>
        {error && (
          <p id="checkout-error" className="error" role="alert">
            {error}
          </p>
        )}
        <button className="button" type="submit" disabled={loading || !enabled}>
          {loading
            ? "Betaalpagina openen…"
            : `Pre-order nu · betaal ${money(calculateTotal(quantity))}`}
        </button>
      </form>
      <aside
        className="order-summary checkout-summary"
        aria-label="Besteloverzicht"
      >
        <h2>Jouw eerste oplage</h2>
        <p>
          {book.title}
          <br />
          {book.author}
          <br />
          Paperback · pre-order
        </p>
        <dl aria-live="polite">
          <div>
            <dt>
              {quantity} × {money(book.paperbackPrice)}
            </dt>
            <dd>{money(quantity * book.paperbackPrice)}</dd>
          </div>
          <div>
            <dt>Verzending NL</dt>
            <dd>{money(book.shipping.price)}</dd>
          </div>
          <div className="total">
            <dt>Totaal</dt>
            <dd>{money(calculateTotal(quantity))}</dd>
          </div>
        </dl>
        <p>
          Alle bedragen inclusief btw.
          <br />
          {book.expectedShippingPeriod}
        </p>
        <p>
          Je betaalt via de beveiligde betaalpagina van Mollie met iDEAL. Na
          bevestiging van de betaling{" "}
          {testMode
            ? "wordt alleen een testorder opgeslagen; er wordt geen e-mail verstuurd."
            : "ontvang je een e-mail."}
        </p>
        <p>
          Een cadeau? Vul het adres van de ontvanger in en gebruik je eigen
          e-mailadres.
        </p>
        <p>
          Vragen?{" "}
          <Link prefetch={false} href={`mailto:${book.email}`}>
            {book.email}
          </Link>
        </p>
      </aside>
    </div>
  );
}

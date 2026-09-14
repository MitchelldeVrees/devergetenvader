"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { book, money } from "@/lib/site";
import { track } from "@/lib/analytics";
type Status = {
  id: string;
  status: string;
  amount: number;
  quantity: number;
  unitPrice: number;
  expectedShippingPeriod: string;
  testMode?: boolean;
};
export function OrderStatus({ id }: { id: string }) {
  const [order, setOrder] = useState<Status | null>(null);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const token = useRef("");
  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    if (queryToken) {
      token.current = queryToken;
      try {
        sessionStorage.setItem(`dvv-order-${id}`, queryToken);
      } catch {
        /* Use memory if storage is blocked. */
      }
      window.history.replaceState({}, "", window.location.pathname);
    } else if (!token.current) {
      try {
        token.current = sessionStorage.getItem(`dvv-order-${id}`) || "";
      } catch {
        /* No stored token. */
      }
    }
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    let polls = 0;
    async function check() {
      setError("");
      setChecking(true);
      try {
        const response = await fetch(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token.current}` },
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setOrder(data);
        if (data.status === "paid" && !data.testMode) {
          let sent = false;
          try {
            sent = sessionStorage.getItem(`dvv-purchase-${id}`) === "yes";
          } catch {
            /* Optional analytics. */
          }
          if (
            !sent &&
            track("purchase", {
              transaction_id: id,
              value: data.amount / 100,
              currency: "EUR",
              items: [
                {
                  item_id: book.sku,
                  item_name: book.title,
                  price: data.unitPrice / 100,
                  quantity: data.quantity,
                },
              ],
            })
          ) {
            try {
              sessionStorage.setItem(`dvv-purchase-${id}`, "yes");
            } catch {
              /* Optional. */
            }
          }
        } else if (
          !["paid", "failed", "canceled", "expired"].includes(data.status) &&
          ++polls < 12
        )
          timer = setTimeout(check, 5000);
      } catch (error) {
        if (!controller.signal.aborted)
          setError(
            error instanceof Error
              ? error.message
              : "Status controleren lukt nu niet.",
          );
      } finally {
        if (!controller.signal.aborted) setChecking(false);
      }
    }
    void check();
    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [id, attempt]);
  const failed =
    order && ["failed", "canceled", "expired"].includes(order.status);
  return (
    <section className="content-shell prose" aria-live="polite">
      <p className="kicker">Jouw pre-order</p>
      <h1>
        {order?.status === "paid"
          ? "Je pre-order is bevestigd"
          : failed
            ? "Je betaling is niet afgerond"
            : "We controleren je betaling"}
      </h1>
      {order?.status === "paid" ? (
        <>
          <p>
            Bedankt! {order.quantity} × {book.title} is voor je gereserveerd.
            Betaald: {money(order.amount)}.
          </p>
          <p>
            {order.testMode
              ? "Dit was een testbetaling. Er is geen echt geld afgeschreven en er wordt geen boek verzonden."
              : `${order.expectedShippingPeriod}. Je ontvangt een bevestiging per e-mail.`}
          </p>
          <p>
            Bestelnummer: <span className="order-id">{id}</span>
          </p>
        </>
      ) : failed ? (
        <>
          <p>
            Er is geen bevestigde betaling voor deze poging. Je kunt een nieuwe
            pre-order plaatsen.
          </p>
          <Link
            prefetch={false}
            className="button"
            href="/bestellen"
            onClick={() => {
              try {
                sessionStorage.removeItem("dvv-checkout-attempt");
              } catch {
                /* No storage. */
              }
            }}
          >
            Opnieuw pre-orderen
          </Link>
        </>
      ) : (
        <p>
          We wachten op de bevestiging van de betaalprovider. Sluit je deze
          pagina, dan blijft je bestelling bewaard. Betaal niet opnieuw zolang
          de status onbekend is.
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {order?.status !== "paid" && !failed && (
        <button
          className="button"
          disabled={checking}
          onClick={() => setAttempt((v) => v + 1)}
        >
          {checking ? "Controleren…" : "Controleer betaalstatus"}
        </button>
      )}
      <p>
        Vragen? Mail{" "}
        <Link prefetch={false} href={`mailto:${book.email}`}>
          {book.email}
        </Link>
        .{" "}
        <Link prefetch={false} href="/">
          Terug naar het boek
        </Link>
        .
      </p>
    </section>
  );
}

import Link from "next/link";
import { CheckoutForm } from "@/components/CheckoutForm";
import { checkoutReady, checkoutTestMode } from "@/lib/checkout-config";
import { pageMetadata } from "@/lib/seo";
import { book } from "@/lib/site";
export const metadata = pageMetadata(
  "Pre-order De vergeten vader | Paperback – Sem de Wachter",
  "Reserveer jouw paperback van De vergeten vader. Bekijk prijs, verzendperiode en bezorging en reken zonder account af met iDEAL.",
  "/bestellen",
);
export default function Checkout() {
  const enabled = checkoutReady();
  return (
    <section className="content-shell">
      <p className="kicker">De vergeten vader · paperback</p>
      <h1>Reserveer jouw exemplaar</h1>
      <p className="intro">
        Voor jezelf. Of voor die andere man naast de buik.
      </p>
      {!enabled && (
        <p className="notice" role="status">
          De pre-orderverkoop wordt klaargezet. Betalen is op dit moment nog
          niet mogelijk. {book.expectedShippingPeriod}. Heb je een vraag?{" "}
          <Link prefetch={false} href={`mailto:${book.email}`}>
            Mail Sem
          </Link>
          .
        </p>
      )}
      {checkoutTestMode() && (
        <p className="notice">
          Mollie-testmodus: er wordt geen echt geld afgeschreven, geen boek
          verzonden en geen e-mail verstuurd. Gebruik fictieve bestelgegevens.
        </p>
      )}
      <CheckoutForm enabled={enabled} testMode={checkoutTestMode()} />
    </section>
  );
}

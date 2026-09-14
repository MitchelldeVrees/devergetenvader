import Link from "next/link";
import { book, site } from "@/lib/site";
import { WaitlistButton } from "./WaitlistModal";
import { PreorderLink } from "./PreorderLink";
import styles from "./Order.module.css";
export function Order() {
  return (
    <section id="bestel" className={`shell anchor ${styles.section}`}>
      <h2 className={styles.heading}>Voor de man naast de buik</h2>
      <div className={styles.grid}>
        <div className={styles.buyCard}>
          <p className={styles.buyKicker}>
            Reserveer jouw exemplaar uit de eerste oplage
          </p>
          <div className={styles.price}>{site.price}</div>
          <p className={styles.specs}>
            Paperback{book.pages ? ` · ${book.pages} pagina’s` : ""} ·{" "}
            {book.shipping.policy}
          </p>
          <p>{book.expectedShippingPeriod}</p>
          <div className={styles.buyActions}>
            <PreorderLink className={styles.primary} />
          </div>
          <p className={styles.payment}>
            Een pre-order: je betaalt nu, het boek wordt later verstuurd.
            Rechtstreeks van {book.author}.
          </p>
        </div>
        <div className={styles.waitCard}>
          <p className={styles.waitKicker}>Nog even over nadenken?</p>
          <h3 className={styles.waitHeading}>Eerst een seintje</h3>
          <p className={styles.waitBody}>
            Dat mag. Ontvang af en toe een update over het boek. Of{" "}
            <Link prefetch={false} href="/#fragment">
              lees alvast een fragment
            </Link>{" "}
            — zonder je e-mailadres achter te laten.
          </p>
          <WaitlistButton className={styles.waitButton}>
            Houd mij op de hoogte
          </WaitlistButton>
          <p className={styles.finePrint}>
            Alleen boekupdates. Uitschrijven kan altijd.
          </p>
        </div>
      </div>
    </section>
  );
}

import { site } from "@/lib/site";
import { WaitlistButton } from "./WaitlistModal";
import styles from "./Order.module.css";

export function Order() {
  return (
    <section id="bestel" className={`shell anchor ${styles.section}`}>
      <h2 className={styles.heading}>Haal &rsquo;m in huis</h2>

      <div className={styles.grid}>
        <div className={styles.buyCard}>
          <p className={styles.buyKicker}>Binnenkort verkrijgbaar</p>
          <div className={styles.price}>{site.price}</div>
          <p className={styles.specs}>
            Paperback · {site.pages} pagina&rsquo;s · gratis verzending in NL
          </p>
          <div className={styles.buyActions}>
            <WaitlistButton className={styles.primary}>
              In de mand
            </WaitlistButton>
            <WaitlistButton className={styles.ghost}>
              E-book — {site.ebookPrice}
            </WaitlistButton>
          </div>
          <p className={styles.payment}>
            Laat je e-mail achter en hoor als eerste wanneer het boek uitkomt
          </p>
        </div>

        <div className={styles.waitCard}>
          <p className={styles.waitKicker}>Als eerste op de hoogte</p>
          <div className={styles.waitHeading}>
            Het boek is
            <br />
            bijna klaar
          </div>
          <p className={styles.waitBody}>
            Ik zit in de afrondende fase. Laat je e-mailadres achter, dan hoor
            je als eerste wanneer het boek verschijnt.
          </p>
          <WaitlistButton className={styles.waitButton}>
            Laat je e-mail achter
          </WaitlistButton>
          <p className={styles.finePrint}>Geen nieuwsbrief-gezeur.</p>
        </div>
      </div>
    </section>
  );
}

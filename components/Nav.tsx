import { site } from "@/lib/site";
import { WaitlistButton } from "./WaitlistModal";
import styles from "./Nav.module.css";

export function Nav() {
  return (
    <nav className={styles.nav} aria-label="Hoofdnavigatie">
      <a href="#top" className={styles.brand}>
        {site.title}
      </a>
      <div className={styles.links}>
        <a href="#fragment" className={styles.link}>
          Fragment
        </a>
        <a href="#faq" className={styles.link}>
          Vragen
        </a>
        <WaitlistButton className={styles.cta}>
          Bestel · {site.price}
        </WaitlistButton>
      </div>
    </nav>
  );
}

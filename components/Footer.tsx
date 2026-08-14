import { site } from "@/lib/site";
import { WaitlistButton } from "./WaitlistModal";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brand}>{site.title}</div>
        <nav className={styles.links} aria-label="Footer">
          <WaitlistButton className={styles.link}>
            Bestellen
          </WaitlistButton>
          <a href="#fragment" className={styles.link}>
            Fragment
          </a>
          <a href="#faq" className={styles.link}>
            Vragen
          </a>
          <a href={`mailto:${site.email}`} className={styles.link}>
            Contact
          </a>
          <span className={styles.muted}>Algemene voorwaarden</span>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { site } from "@/lib/site";
import { PreorderLink } from "./PreorderLink";
import { PrivacyPreferences } from "./PrivacyPreferences";
import styles from "./Footer.module.css";
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <div>
          <div className={styles.brand}>{site.title}</div>
          <p>Het boek van {site.author}</p>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <PreorderLink className={styles.link} />
          <Link
            prefetch={false}
            href="/boek-aanstaande-vader"
            className={styles.link}
          >
            Het boek
          </Link>
          <Link
            prefetch={false}
            href="/cadeau-aanstaande-vader"
            className={styles.link}
          >
            Cadeau voor hem
          </Link>
          <Link prefetch={false} href="/blog" className={styles.link}>
            Verhalen & tips
          </Link>
          <Link prefetch={false} href="/over-sem" className={styles.link}>
            Over Sem
          </Link>
          <Link
            prefetch={false}
            href={`mailto:${site.email}`}
            className={styles.link}
          >
            {site.email}
          </Link>
          <Link
            prefetch={false}
            href="/algemene-voorwaarden"
            className={styles.link}
          >
            Algemene voorwaarden
          </Link>
          <Link prefetch={false} href="/privacy" className={styles.link}>
            Privacy
          </Link>
          <PrivacyPreferences className={styles.link} />
        </nav>
      </div>
    </footer>
  );
}

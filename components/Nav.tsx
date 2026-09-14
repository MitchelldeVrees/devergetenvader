import Link from "next/link";
import { site } from "@/lib/site";
import { PreorderLink } from "./PreorderLink";
import styles from "./Nav.module.css";
export function Nav() {
  return (
    <header className={styles.nav}>
      <Link prefetch={false} href="/" className={styles.brand}>
        {site.title}
      </Link>
      <nav className={styles.links} aria-label="Hoofdnavigatie">
        <Link prefetch={false} href="/#fragment" className={styles.link}>
          Fragment
        </Link>
        <Link prefetch={false} href="/blog" className={styles.link}>
          Verhalen
        </Link>
        <PreorderLink className={styles.cta} />
      </nav>
    </header>
  );
}

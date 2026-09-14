import Link from "next/link";
import { book } from "@/lib/site";
import styles from "./Author.module.css";
export function Author() {
  return (
    <section id="auteur" className={`anchor ${styles.section}`}>
      <div className="shell">
        <p className={styles.kicker}>over {book.author}</p>
        <h2 className={styles.heading}>Ik was die vergeten vader</h2>
        <div className={styles.column}>
          <p className={styles.prose}>
            Negen maanden lang zat ik in wachtkamers waar niemand mij iets
            vroeg. Ik heb alles opgeschreven: de blunders, de zenuwen, de
            reclames met honden. Dit boek is wat ik zelf had willen lezen.
          </p>
          <p className={styles.prose}>
            Inmiddels ben ik vader. Nog steeds geen expert — wel
            ervaringsdeskundige.
          </p>
          <Link prefetch={false} className="light-link" href="/over-sem">
            Meer over Sem en het boek →
          </Link>
        </div>
      </div>
    </section>
  );
}

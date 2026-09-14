import styles from "./Reasons.module.css";
import { PreorderLink } from "./PreorderLink";

const reasons = [
  {
    n: "01",
    title: "Eerlijk, niet wijs",
    body: "Geen checklist van een expert die zelf nooit om drie uur 's nachts een wieg in elkaar zette.",
  },
  {
    n: "02",
    title: "Even een hoofdstuk",
    body: "Korte hoofdstukken. Precies lang genoeg voor een wachtkamer bij de verloskundige.",
  },
  {
    n: "03",
    title: "Hét cadeau",
    body: "Voor je partner, broer of vriend. Eindelijk iets voor hem tussen alle rompertjes.",
  },
];

export function Reasons() {
  return (
    <section className={`shell ${styles.section}`}>
      <ul className={styles.grid}>
        {reasons.map((r) => (
          <li key={r.n} className={styles.item}>
            <div className={styles.number}>{r.n}</div>
            <h2 className={styles.title}>{r.title}</h2>
            <p className={styles.body}>{r.body}</p>
          </li>
        ))}
      </ul>
      <p className="section-action">
        <PreorderLink />
      </p>
    </section>
  );
}

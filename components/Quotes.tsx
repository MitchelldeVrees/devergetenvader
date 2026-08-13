import styles from "./Quotes.module.css";

const quotes = [
  {
    quote:
      "Ik las het in twee avonden en herkende mezelf op elke pagina. Ook de pagina's waar ik dat liever niet had.",
    who: "Thomas, vader sinds maart",
  },
  {
    quote:
      "Gekocht voor mijn vriend. Nu leest hij het 's avonds aan mij voor.",
    who: "Ilse, 31 weken",
  },
  {
    quote:
      "Eindelijk een zwangerschapsboek waarin ik niet alleen de chauffeur ben.",
    who: "Joost, 38 weken",
  },
];

export function Quotes() {
  return (
    <section className={`shell ${styles.section}`} aria-label="Lezersreacties">
      <div className={styles.grid}>
        {quotes.map((q) => (
          <figure key={q.who} className={styles.card}>
            <blockquote className={styles.quote}>
              &ldquo;{q.quote}&rdquo;
            </blockquote>
            <figcaption className={styles.who}>— {q.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

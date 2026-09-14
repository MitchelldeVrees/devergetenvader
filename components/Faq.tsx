import { site } from "@/lib/site";
import styles from "./FAQ.module.css";

/**
 * Answers phrased as the actual queries gift-shoppers type ("cadeau voor
 * aanstaande vader", "zwangerschapscadeau man") rather than generic product
 * questions. Doubles as FAQPage structured data below, so keep every
 * answer here truthful to what the rest of the site already claims — no
 * copy should exist only for a rich-result snippet.
 */
const faqs = [
  {
    q: "Is De vergeten vader een goed cadeau voor een zwangerschap?",
    a: "Ja — dit boek is speciaal geschreven voor de partner, niet voor de zwangere zelf. Grappige, eerlijke verhalen vanaf de andere kant van de echo maken het een origineel zwangerschapscadeau, kraamcadeau of vaderdagcadeau voor een aanstaande vader.",
  },
  {
    q: "Voor wie is dit boek bedoeld?",
    a: "Voor aanstaande vaders en hun partners die op zoek zijn naar een cadeau met humor in plaats van weer een babyproduct. Ook fijn voor wie het boek zelf cadeau wil doen aan een vriend, broer of collega die vader wordt.",
  },
  {
    q: "Wanneer verschijnt het boek?",
    a: "De laatste hoofdstukken worden nu afgerond. Laat je e-mailadres achter en je hoort als eerste wanneer De vergeten vader verschijnt en besteld kan worden.",
  },
  {
    q: "Is er ook een e-book?",
    a: `Ja, naast de paperback (${site.price}) komt er een e-book (${site.ebookPrice}).`,
  },
  {
    q: "Hoeveel pagina's heeft het boek?",
    a: `${site.pages} pagina's, verdeeld in korte hoofdstukken — precies lang genoeg voor een wachtkamer bij de verloskundige of een paar bladzijden voor het slapengaan.`,
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export function FAQ() {
  return (
    <section id="faq" className={`shell anchor ${styles.section}`}>
      <p className={styles.kicker}>veelgestelde vragen</p>
      <h2 className={styles.heading}>Cadeau vragen?</h2>

      <div className={styles.list}>
        {faqs.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.question}>{f.q}</summary>
            <p className={styles.answer}>{f.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}

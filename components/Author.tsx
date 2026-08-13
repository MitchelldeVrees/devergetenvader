import styles from "./Author.module.css";

export function Author() {
  return (
    <section id="auteur" className={`anchor ${styles.section}`}>
      <div className={`shell ${styles.grid}`}>
        <div className={styles.column}>
          <p className={styles.kicker}>over de auteur</p>
          <h2 className={styles.heading}>
            Ik was die
            <br />
            vergeten vader
          </h2>
          <p className={styles.prose}>
            Negen maanden lang zat ik in wachtkamers waar niemand mij iets
            vroeg. Ik heb alles opgeschreven: de blunders, de zenuwen, de
            reclames met honden. Dit boek is wat ik zelf had willen lezen.
          </p>
          <p className={styles.prose}>
            Inmiddels ben ik vader. Nog steeds geen expert — wel
            ervaringsdeskundige.
          </p>
        </div>

        <div className={styles.portraitWrap}>
          {/* Swap this placeholder for <Image src={portret} … /> zodra de foto er is. */}
          <div className={styles.portrait}>
            <p className={styles.portraitLabel}>
              Plaatshouder
              <br />
              auteursfoto
              <br />
              <span className={styles.portraitHint}>(stuur je &rsquo;m aan?)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

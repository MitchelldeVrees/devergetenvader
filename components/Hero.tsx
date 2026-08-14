import Image from "next/image";
import { site } from "@/lib/site";
import cover from "@/public/cover.jpg";
import { WaitlistButton } from "./WaitlistModal";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header id="top" className={styles.hero}>
      <div className={styles.blob} aria-hidden="true" />
      <div className={`shell ${styles.grid}`}>
        <div>
          <h1 className={styles.wordmark}>
            {/* The joke of the cover: "vergeten" struck through, "gevonden"
                scrawled over it. Read aloud as one line for screen readers. */}
            <span className={styles.srOnly}>
              De vergeten vader — het boek voor de aanstaande vader, hét
              cadeau bij een zwangerschap
            </span>
            <span className={styles.lockup} aria-hidden="true">
              <span className={styles.display}>
                De
                <br />
                vergeten
                <br />
                vader
              </span>
              <span className={styles.strike} />
              <span className={styles.scrawl}>gevonden</span>
            </span>
          </h1>

          <p className={styles.lede}>
            Negen maanden lang gaat het over haar buik. Terecht. Maar er staat
            ook iemand naast dat bed die geen idee heeft wat hij met zijn handen
            moet doen. Dit boek is voor hem — met grappige, eerlijke verhalen
            vanaf de andere kant van de echo.
          </p>

          <div className={styles.actions}>
            <WaitlistButton className={styles.buy}>
              Bestel het boek — {site.price}
            </WaitlistButton>
            <a href="#fragment" className={styles.secondary}>
              Lees eerst een hoofdstuk
            </a>
          </div>

          <p className={styles.shipping}>
            De laatste hoofdstukken worden nu afgerond
          </p>
        </div>

        <div className={styles.coverWrap}>
          <Image
            src={cover}
            alt={`Omslag van ${site.title} — cadeau voor de aanstaande vader`}
            className={styles.cover}
            priority
            sizes="(max-width: 720px) 100vw, 360px"
          />
          <div className={styles.badge}>
            Hét cadeau
            <br />
            voor de
            <br />
            aanstaande
            <br />
            vader ♥
          </div>
        </div>
      </div>
    </header>
  );
}

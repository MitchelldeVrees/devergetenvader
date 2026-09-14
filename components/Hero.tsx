import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { PreorderLink } from "./PreorderLink";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <header id="top" className={styles.hero}>
      <div className={styles.blob} aria-hidden="true" />
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 className={styles.wordmark}>
            {/* The joke of the cover: "vergeten" struck through, "gevonden"
                scrawled over it. Read aloud as one line for screen readers. */}
            <span className={styles.srOnly}>De vergeten vader</span>
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

          <p className={styles.tagline}>
            Het grappige en eerlijke boek voor de man naast de buik.
          </p>
          <p className={styles.author}>Door {site.author}</p>
          <p className={styles.lede}>
            Negen maanden lang gaat het over haar buik. Terecht. Maar er staat
            ook iemand naast dat bed die geen idee heeft wat hij met zijn handen
            moet doen. Dit boek is voor hem — met grappige, eerlijke verhalen
            vanaf de andere kant van de echo.
          </p>

          <div className={styles.actions}>
            <PreorderLink className={styles.buy}>
              Pre-order nu — {site.price}
            </PreorderLink>
            <Link
              prefetch={false}
              href="#fragment"
              className={styles.secondary}
            >
              Lees een fragment
            </Link>
          </div>

          <p className={styles.shipping}>
            Paperback · {site.shipping.policy}
            <br />
            Pre-order · {site.expectedShippingPeriod}
          </p>
        </div>

        <div className={styles.coverWrap}>
          <Image
            src={site.coverImage}
            width={site.coverWidth}
            height={site.coverHeight}
            alt={`Boekomslag van ${site.title} van ${site.author}`}
            className={styles.cover}
            priority
            sizes="(max-width: 640px) 30vw, 360px"
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

"use client";

import { useState } from "react";
import styles from "./Fragment.module.css";

const scores = [
  { label: "De 20-wekenecho", score: "6/10", peak: false },
  { label: "De babykamer", score: "9/10", peak: false },
  { label: "De bevalling", score: "10/10", peak: true },
];

export function Fragment() {
  const [open, setOpen] = useState(false);

  return (
    <section id="fragment" className={`anchor ${styles.section}`}>
      <div className={`shell ${styles.grid}`}>
        <div className={styles.column}>
          <p className={styles.kicker}>hoofdstuk twaalf</p>
          <h2 className={styles.heading}>
            Hormonen:
            <br />
            een veldgids
          </h2>
          <div className={styles.rule} aria-hidden="true">
            ~ ~ ~ ~ ~
          </div>

          <p className={styles.prose}>
            Op een woensdagavond huilde Sanne om een reclame van een
            verzekeringsmaatschappij. Er zat een hond in. De hond werd ouder en
            het baasje ook, en aan het einde zaten ze samen op een bankje.
          </p>
          <p className={styles.prose}>Oké, eerlijk: het wás een goeie reclame.</p>
          <p className={styles.prose}>Maar ik zei: &ldquo;Het is maar een reclame.&rdquo;</p>

          {/* Kept in the DOM so `aria-controls` always resolves to a real node. */}
          <p className={styles.prose} id="fragment-vervolg" hidden={!open}>
            Mannen die dit lezen: zeg dat nooit. Er bestaat geen zin die
            slechter presteert. &ldquo;Het is maar een reclame&rdquo; hoort in
            hetzelfde rijtje als &ldquo;rustig maar&rdquo; en &ldquo;ik ben ook
            best moe&rdquo;. Dat rijtje heette vroeger: Zinnen Waarmee Je De
            Logeerkamer Verdient. Maar de logeerkamer is inmiddels een
            babykamer, dus tegenwoordig heet het: Zinnen Waarmee Je De Bank
            Verdient. De inzet is verhoogd.
          </p>

          <button
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="fragment-vervolg"
          >
            {open ? "Minder tonen" : "Lees verder →"}
          </button>
        </div>

        <aside className={styles.card}>
          <p className={styles.cardKicker}>De Vergeetschaal</p>
          <div className={styles.score}>
            8<span className={styles.scoreOutOf}>/10</span>
          </div>
          <p className={styles.cardBody}>
            Elk hoofdstuk eindigt met een cijfer: hoe vergeten was de vader deze
            week? Volstrekt onwetenschappelijk, en verdacht vaak kloppend.
          </p>
          <ul className={styles.rows}>
            {scores.map((s) => (
              <li
                key={s.label}
                className={`${styles.row} ${s.peak ? styles.rowPeak : ""}`}
              >
                <span>{s.label}</span>
                <span>{s.score}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

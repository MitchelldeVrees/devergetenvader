"use client";

import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./WaitlistModal.module.css";

const WaitlistContext = createContext<(() => void) | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          website: formData.get("website"),
        }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Inschrijven is niet gelukt.");
      }

      setSubmissionState("success");
      form.reset();
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Inschrijven lukt nu even niet. Probeer het later opnieuw.",
      );
    }
  }

  return (
    <WaitlistContext.Provider value={() => setIsOpen(true)}>
      {children}

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="waitlist-title"
        onCancel={() => setIsOpen(false)}
        onClose={() => setIsOpen(false)}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
      >
        <div className={styles.card}>
          <button
            type="button"
            className={styles.close}
            aria-label="Sluiten"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden="true">×</span>
          </button>

          {submissionState === "success" ? (
            <div className={styles.success} role="status">
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              <h2 id="waitlist-title" className={styles.title}>
                Bedankt!
              </h2>
              <p className={styles.copy}>
                Je staat op de lijst. Je hoort het als eerste zodra het boek
                verschijnt.
              </p>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => setIsOpen(false)}
              >
                Sluiten
              </button>
            </div>
          ) : (
            <>
              <p className={styles.kicker}>Nog heel even geduld</p>
              <h2 id="waitlist-title" className={styles.title}>
                Het boek is bijna klaar
              </h2>
              <p className={styles.copy}>
                Ik zit in de afrondende fase van het boek. Laat je e-mailadres
                achter, dan hoor je als eerste wanneer het verschijnt.
              </p>

              <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.srOnly} htmlFor="waitlist-email">
                  E-mailadres
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="jouw@mail.nl"
                  className={styles.input}
                  disabled={submissionState === "submitting"}
                  autoFocus
                />
                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </label>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting"
                    ? "Even wachten…"
                    : "Houd mij op de hoogte"}
                </button>
              </form>
              {submissionState === "error" && (
                <p className={styles.error} role="alert">
                  {errorMessage}
                </p>
              )}
              <p className={styles.finePrint}>
                Alleen updates over het boek. Je kunt je altijd uitschrijven.
              </p>
            </>
          )}
        </div>
      </dialog>
    </WaitlistContext.Provider>
  );
}

export function WaitlistButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const openWaitlist = useContext(WaitlistContext);

  if (!openWaitlist) {
    throw new Error("WaitlistButton must be used inside WaitlistProvider");
  }

  return (
    <button type="button" className={className} onClick={openWaitlist}>
      {children}
    </button>
  );
}

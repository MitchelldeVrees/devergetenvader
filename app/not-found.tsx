import Link from "next/link";
export default function NotFound() {
  return (
    <div className="content-shell prose">
      <p className="kicker">404</p>
      <h1>Deze pagina is even zoek</h1>
      <p>
        Het boek gelukkig niet.{" "}
        <Link prefetch={false} href="/">
          Terug naar De vergeten vader
        </Link>{" "}
        of{" "}
        <Link prefetch={false} href="/blog">
          lees een verhaal
        </Link>
        .
      </p>
    </div>
  );
}

import { ArticleCards } from "@/components/ArticleCards";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Verhalen en tips voor aanstaande vaders | De vergeten vader",
  "Lees over voor het eerst vader worden, je rol als partner en de man naast de buik. Eerlijke verhalen en praktische ideeën van De vergeten vader.",
  "/blog",
);
export default function Blog() {
  return (
    <>
      <div className="content-shell page-intro">
        <p className="kicker">Het leven naast de buik</p>
        <h1>Verhalen voor onderweg naar vader</h1>
        <p className="intro">
          Geen examenstof. Wel ruimte voor de vragen die onderweg opkomen.
        </p>
      </div>
      <ArticleCards />
    </>
  );
}

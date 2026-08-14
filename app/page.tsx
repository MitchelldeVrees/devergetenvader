import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Reasons } from "@/components/Reasons";
import { Fragment } from "@/components/Fragment";
import { Quotes } from "@/components/Quotes";
import { Order } from "@/components/Order";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reasons />
        <Fragment />
        <Quotes />
        <Order />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
